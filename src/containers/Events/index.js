import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastEvent = currentPage * PER_PAGE;
  const indexOfFirstEvent = indexOfLastEvent - PER_PAGE; 

  const filteredEvents = (
    type ? data?.events.filter((event) => event.type === type) : data?.events ) || [];
  
  const groupedEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);    

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE); 
  const nPages =  [...Array(pageNumber + 1).keys()].slice(1);
  const typeList = new Set(data?.events.map((event) => event.type)); 
  
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {groupedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {nPages.map((number) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={number} href="#events" onClick={() => setCurrentPage(number)} >
                {number}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
