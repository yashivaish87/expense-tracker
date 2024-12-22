import './App.css';
import Form from './components/Form';
import Graph from './components/Graph';
import Header from './components/Header';


function App() {
  return (
    
      <div className="text-center drop-shadow-lg dark:bg-[#141625] dark:text-gray-500 text-gray-800 duration-300 min-h-screen">
        <Header></Header>
        
          {/* <h1 className="text-4xl py-8 mb-10 text-white rounded shadow-lg sm:px-4" style={{backgroundColor: '#20504F'}}>Expense Tracker</h1> */}
          
          {/* grid columns */}
          <div className="mt-10 grid md:grid-cols-2 gap-4">
              {/* Chart */}
              <Graph></Graph>
              {/* Form */}
              <Form></Form>
          </div>  
      </div>
   
  );
}

export default App;
