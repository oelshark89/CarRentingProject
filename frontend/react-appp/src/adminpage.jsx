import React, { useState } from 'react';
import Header from './components/header/header'; // Corrected component name and file path
import Slider from './components/slider/slider';
import Text from './components/Text/text';
import Products2 from './components/products/prod2'; // Consider renaming to maintain consistency
import Sidebar from './components/sidebar/sidebar';
import Customers from './components/customersProducts/customers.jsx';
import Reservations from './components/reservationsProducts/reservations.jsx';
import Offices from './components/officesProducts/officesProducts.jsx'
import Report1 from './components/reportPopup/report1.jsx';
import Report2 from './components/reportPopup/report2.jsx';
import Report3 from './components/reportPopup/report3.jsx';
import Report4 from './components/reportPopup/report4.jsx';
import Report5 from './components/reportPopup/report5.jsx';
import Report1InputForm from './components/reportsInputForm/report1InputForm.jsx';
import Report2InputForm from './components/reportsInputForm/report2InputForm.jsx';
import Report3InputForm from './components/reportsInputForm/report3InputForm.jsx';
import Report4InputForm from './components/reportsInputForm/report4InputForm.jsx';
import Report5InputForm from './components/reportsInputForm/report5InputForm.jsx';


import Banner from './components/banner/banner.jsx'
import Footer from './components/footer/footer.jsx'
import './App1.css';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState(1);
  const [activeReport, setActiveReport] = useState(null);

  const [visibility, setVisibility] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleToggleChange = (index) => {
    setActiveTab(index);
  };

  const [showInputForm, setShowInputForm] = useState(false);

  const handleReportInput = (reportNumber) => {
    // Show the input form popup
    setActiveReport(reportNumber);
    setShowInputForm(true);
  };

  const handleReportSubmit = (reportNumber, userInputs) => {

    // Close the input form popup
    setShowInputForm(false);

    // Call your handleReportClick function with user-entered inputs
    handleReportClick(reportNumber, userInputs);
  };

  const handleInputFormCancel = () => {
    // Close the input form popup
    setShowInputForm(false);
  };


  const handleReportClick = async (reportNumber, requestBody) => {

    let apiEndpoint;

    switch (reportNumber) {
      case 1:
        apiEndpoint = 'http://localhost:3003/admin/reportReservationsWithinPeriod';
        break;
      case 2:
        apiEndpoint = 'http://localhost:3003/admin/reportCarReservationsWithinPeriod';
        break;
      case 3:
        apiEndpoint = 'http://localhost:3003/admin/reportCarsStatusOnDay';
        break;
      case 4:
        apiEndpoint = 'http://localhost:3003/admin/reportCustomerReservations';
        break;
      case 5:
        apiEndpoint = 'http://localhost:3003/admin/reportdailyPayments';
        break;
      default:
        return;
    }

    setActiveReport(reportNumber);

    try {
      setIsLoading(true);
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error fetching report data: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Report Data:', responseData); // Log the data


      setReportData(responseData);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  let componentToRender;

  switch (activeTab) {
    case 1:
      componentToRender = <Products2 toggleState={activeTab} />;
      break;
    case 2:
      componentToRender = <Reservations toggleState={activeTab} />;
      break;
    case 3:
      componentToRender = <Customers toggleState={activeTab} />;
      break;
      case 4:
      componentToRender = <Offices toggleState={activeTab} />;
      break;
    default:
      componentToRender = <Products2 toggleState={activeTab} />;
  }

  return (
    <div>
      <div className={`admin-page ${isSidebarOpen ? 'shifted' : ''}`}>
        <Sidebar toogleState={activeTab} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleReportInput={handleReportInput} />
        <div className={`content ${isSidebarOpen ? 'content-shifted' : ''}`}>
          <button
            onClick={toggleSidebar}
            className={`content-toggle ${isSidebarOpen ? 'hidden' : ''}`}
          >
            {isSidebarOpen ? '⇦' : '⇨'}
          </button>
          <Header toggleSidebar={toggleSidebar} />
          <Slider />
          <Text toggleState={activeTab} onToggleChange={handleToggleChange} visibility={visibility} />
          {activeReport === 1 && showInputForm && (<Report1InputForm reportNumber={activeReport} onSubmit={handleReportSubmit} onCancel={handleInputFormCancel} />)}
          {activeReport === 2 && showInputForm && (<Report2InputForm reportNumber={activeReport} onSubmit={handleReportSubmit} onCancel={handleInputFormCancel} />)}
          {activeReport === 3 && showInputForm && (<Report3InputForm reportNumber={activeReport} onSubmit={handleReportSubmit} onCancel={handleInputFormCancel} />)}
          {activeReport === 4 && showInputForm && (<Report4InputForm reportNumber={activeReport} onSubmit={handleReportSubmit} onCancel={handleInputFormCancel} />)}
          {activeReport === 5 && showInputForm && (<Report5InputForm reportNumber={activeReport} onSubmit={handleReportSubmit} onCancel={handleInputFormCancel} />)}
          {componentToRender}
          {isLoading && <p>Loading...</p>}
          {showPopup && !showInputForm && (
            <>
              {activeReport === 1 && <Report1 key="report1" data={reportData} closePopup={() => setShowPopup(false)} />}
              {activeReport === 2 && <Report2 key="report2" data={reportData} closePopup={() => setShowPopup(false)} />}
              {activeReport === 3 && <Report3 key="report3" data={reportData} closePopup={() => setShowPopup(false)} />}
              {activeReport === 4 && <Report4 key="report4" data={reportData} closePopup={() => setShowPopup(false)} />}
              {activeReport === 5 && <Report5 key="report5" data={reportData} closePopup={() => setShowPopup(false)} />}
            </>
          )}
          <Banner />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;

