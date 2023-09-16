import Header from "../../Component/Reusable/Header";
import Button from "../../Component/Reusable/Form/Button";
import Table2 from "../../Component/Reusable/Table2";
import WirlessModal from "../../Component/Modals/WirlessModal";
import { useState,useEffect } from "react";
import BackButton from "../../Component/Reusable/BackButton";
import axios from "axios";
/**
 *
 * @returns Add wirless devices and manage devices component
 */
function Wireless() {
  const [show, setShow] = useState(false);
  const [tableData, setTableData] = useState([]); // State to hold fetched data

  // Fetch data from the API using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://myaasaan/cgi-bin/get_radio_info_api.sh");
        setTableData(response.data); // Set fetched data to the state
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array to fetch data only once

  
  /**
   *
   * @returns show and hide create wirless button bases on state
   */
  // const showCreateDevice = () => {
  //   if (!show) {
  //     return<Button name={"Create New WiFi"} onClick={() => setShow(true)} />;
  //   }
  // };

  /**
   *
   * @returns show the table content and add wirless form based on state
   */
  const showWirlessContent = () => {
    if (show) {
      return (
        <>
          <BackButton setShow={setShow} />
          <WirlessModal
            show={show}
            type={"WIRELESS"}
            onHide={() => setShow(false)}
          />
        </>
      );
    } else {
      const slicedData = tableData.slice(0, 5);
      return (
        <Table2
          type={"WIRELESS"}
          dataList={slicedData}
          isCheckbox={false}
        />
      );
    }
  };
  return (
    <div className={"privateBody"}>
      <div className="row">
        <div className="col-sm-10">
          <Header type={"WIRELESS"} />
        </div>
      </div>

      {showWirlessContent()}
    </div>
  );
}

export default Wireless;
