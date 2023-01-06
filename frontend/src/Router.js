import {Route ,BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import Filter from './Components/Filter';
import Header from './Components/Header';
import Details from './Components/Details';
const Router = ()  => 
{
  return(
      <BrowserRouter>
      <Header />
      <Route exact path="/" component={Home}/>
      <Route path="/home" component={Home}/>
      <Route path="/filter" component={Filter}/>
      <Route path="/restaurantdetails" component={Details} />
      </BrowserRouter>
  );
}
export default Router;