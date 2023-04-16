import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { RiEditLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import {
  IconButton,
  List,
  TrackingListItem,
  Button,
  Place,
  Map,
  ShippingRouteItem,
} from "../components";
import { Details, SideBar } from "../components/Layout";
import SearchList from "../components/SearchList";
import { useSelect, useShipmentsStorage, useShortcut } from "../hooks";
import type { Shipment } from "../shipment.interface";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { ModalAction } from "../components/modal";
import { useSnackbar } from "../components/snackbar";

function Home() {
  const [shipments, setShipments] = useShipmentsStorage();
  const {
    selected,
    select,
    reset,
    isSelected,
    selectPrevious,
    selectLast,
    selectNext,
    selectFirst,
  } = useSelect(shipments);
  const sideBarRef = useRef<HTMLDivElement>(null);
  const { showSnackbar } = useSnackbar();

  // const { isLoading, data, error } = useQuery(
  //   ["correios-rastreio"],
  //   async () => {
  //     const res = await fetch("/api/track");

  //     return res.json();
  //   }
  // );

  useShortcut(() => selected && edit(), {
    shortcut: { code: "KeyE", metaKey: true },
  });

  const route = useRouter();
  const currentId = route.query.id;

  const selectItem = (item: Shipment) => {
    select((f) => f.trackingNumber === item.trackingNumber);
  };

  // FIXME
  useShortcut(
    () => isSelected() && reset(),
    { shortcut: { code: "Escape" }, useGlobal: false },
    sideBarRef?.current
  );

  useShortcut(
    () => (isSelected() ? selectPrevious() : selectLast()),
    { shortcut: { code: "ArrowUp" }, useGlobal: false },
    sideBarRef?.current
  );

  useShortcut(
    () => (isSelected() ? selectNext() : selectFirst()),
    { shortcut: { code: "ArrowDown" }, useGlobal: false },
    sideBarRef?.current
  );

  const edit = () => {
    alert("not implemented yet");
  };

  const searchByTrackingNumber = useCallback(
    (searchTerm: string, { trackingNumber, description }: Shipment) => {
      const searchByKeword = (term: string, field: string) =>
        new RegExp(term, "ig").test(field);

      return [
        searchByKeword(searchTerm, trackingNumber),
        searchByKeword(searchTerm, description ?? ""),
      ].some((v) => v);
    },
    []
  );

  const deleteShipment = () => {
    if (selected) {
      setShipments(
        (items) =>
          items?.filter(
            (item) => item.trackingNumber !== selected.trackingNumber
          ) ?? []
      );
      showSnackbar("Shipment deleted", 2_000);

      // TODO: think about it!
      setTimeout(() => {
        selectPrevious();
      }, 100);
    } else {
      alert("something is wrong!!!");
    }
  };

  const createTracking = ({ trackingNumber, description }: Shipment) => {
    // TODO: usar um modal legal pra isso
    if (shipments.find((t) => t.trackingNumber === trackingNumber)) {
      alert("Tracking number already exists");
      return;
    }

    if (!trackingNumber) {
      alert("Empty tracking number");
      return;
    }

    setShipments((items) =>
      items.concat({
        id: trackingNumber,
        trackingNumber,
        description,
        routes: [
          {
            id: 1,
            description:
              "Objeto em trânsito - por favor aguarde, em trânsito para APARECIDA DE GOIANIA oaksd",
          },
          { id: 2, description: "Objeto postado" },
          {
            id: 3,
            description:
              "Objeto em trânsito - por favor aguarde, em trânsito para APARECIDA DE GOIANIA",
          },
          { id: 4, description: "Objeto postado" },
          {
            id: 5,
            description:
              "Objeto em trânsito - por favor aguarde, em trânsito para APARECIDA DE GOIANIA",
          },
          { id: 6, description: "Objeto postado" },
          {
            id: 7,
            description:
              "Objeto em trânsito - por favor aguarde, em trânsito para última parada",
          },
        ],
        // startDate: new Date(),
      })
    );

    // meh -> talvez tenha que juntar selected com setShipments
    setTimeout(() => {
      select((s) => s.id === trackingNumber);
    }, 100);
  };

  return (
    <>
      <SideBar ref={sideBarRef} onNewTracking={(e) => createTracking(e)}>
        <SearchList items={shipments} filter={searchByTrackingNumber}>
          {(results) => (
            <List
              items={results}
              isSelected={(item) =>
                isSelected((s) => s.trackingNumber === item.trackingNumber)
              }
            >
              {(shipment: Shipment) => (
                <TrackingListItem
                  description={shipment.description}
                  selected={
                    shipment.trackingNumber === selected?.trackingNumber
                  }
                  trackingNumber={shipment.trackingNumber}
                  onClick={() => selectItem(shipment)}
                />
              )}
            </List>
          )}
        </SearchList>
      </SideBar>
      <Details
        title={selected?.trackingNumber}
        renderActions={
          selected && (
            <>
              <IconButton
                data-tooltip-id="edit-btn"
                data-tooltip-content={`Edit ${selected.trackingNumber}`}
                onClick={edit}
              >
                <Tooltip id="edit-btn" />
                <RiEditLine />
              </IconButton>
              <ModalAction
                onConfirm={deleteShipment}
                title={`Delete ${selected.trackingNumber} permanently ?`}
              >
                <IconButton
                  data-tooltip-id="delete-btn"
                  theme="danger"
                  size="sm"
                  data-tooltip-content={`Delete ${selected.trackingNumber}`}
                >
                  <Tooltip id="delete-btn"></Tooltip>
                  <FiMinusCircle />
                </IconButton>
              </ModalAction>
            </>
          )
        }
      >
        <div className="w-full flex flex-col gap-5">
          <Place label="From" place="Madrid, ES" />
          <Place label="To" place="Rio de Janeiro, BR" />
        </div>
        <Map />
        {selected && (
          <div className="flex flex-col items-center gap-5 w-2/3 relative text-gray-400 text-light text-sm">
            <div>
              {selected.routes
                .slice()
                .reverse()
                .slice(0, 2)
                .map((route) => (
                  <ShippingRouteItem
                    key={route.id}
                    description={route.description}
                  />
                ))}
            </div>

            <Link href={"/details/" + selected.id}>
              <a>
                <Button
                  theme="dark"
                  border="pill"
                  RightIcon={AiOutlineArrowRight}
                >
                  Full history
                </Button>
              </a>
            </Link>
          </div>
        )}
      </Details>
    </>
  );
}

export default Home;
