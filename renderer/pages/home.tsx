import { useCallback, useRef } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { RiEditLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { ButtonIcon, List, TrackingListItem } from "../components";
import { Details, SideBar } from "../components/Layout";
import SearchList from "../components/SearchList";
import { useSelect, useShipmentsStorage, useShortcut } from "../hooks";
import type { Shipment } from "../shipment.interface";

function Home() {
  const [shipments, setShipments] = useShipmentsStorage();
  const {
    selected,
    select,
    deselect,
    isSelected,
    selectPrevious,
    selectLast,
    selectNext,
    selectFirst,
  } = useSelect(shipments);
  const sideBarRef = useRef<HTMLDivElement>(null);

  useShortcut(() => selected && edit(), {
    shortcut: { code: "KeyE", metaKey: true },
  });

  // FIXME
  useShortcut(
    () => isSelected() && deselect(),
    {
      shortcut: { code: "Escape" },
      useGlobal: false,
    },
    sideBarRef?.current
  );

  useShortcut(
    () => (isSelected() ? selectPrevious() : selectLast()),
    {
      shortcut: { code: "ArrowUp" },
      useGlobal: false,
    },
    sideBarRef?.current
  );

  useShortcut(
    () => (isSelected() ? selectNext() : selectFirst()),
    {
      shortcut: { code: "ArrowDown" },
      useGlobal: false,
    },
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
        // startDate: new Date(),
      })
    );

    // meh -> talvez tenha que juntar selected com setShipments
    setTimeout(() => {
      select((s) => s.id === trackingNumber);
    }, 100);
  };

  const selectItem = (item: Shipment) =>
    select((selected) => selected.trackingNumber === item.trackingNumber);

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
        renderActions={
          selected && (
            <>
              <ButtonIcon
                data-tooltip-id="edit-btn"
                data-tooltip-content={`Edit ${selected.trackingNumber}`}
                onClick={edit}
              >
                <Tooltip id="edit-btn" />
                <RiEditLine />
              </ButtonIcon>
              <ButtonIcon
                data-tooltip-id="delete-btn"
                data-tooltip-content={`Delete ${selected.trackingNumber}`}
                theme="danger"
                onClick={deleteShipment}
              >
                <Tooltip id="delete-btn"></Tooltip>
                <FiMinusCircle />
              </ButtonIcon>
            </>
          )
        }
      >
        {selected && (
          <div className="p-6">
            <h1 className="text-center text-xl font-bold">
              {selected.trackingNumber}
            </h1>
          </div>
        )}
      </Details>
    </>
  );
}

export default Home;
