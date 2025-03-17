import { Routes , Route } from "react-router-dom";
import Signup from "./Pages/auth/Signup";
import Login from "./Pages/auth/Login";
import UserHome from "./Pages/user/UserHome";
import PrivatePages from "./components/others/PrivatePages";
import Dashboard from "./Pages/admin/Dashboard";
import Addbook from "./Pages/admin/Addbook";
import UserCart from "./Pages/user/UserCart";

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="/login" element={<Login isUser={true} />}/>
          <Route path="/admin" element={<Login isUser={false} />}/>

          <Route element={<PrivatePages isUser={true}/>}>
            <Route path="/home" element={<UserHome/>}/>
            <Route path="/cart" element={<UserCart/>}/>
          </Route>

          <Route element={<PrivatePages isUser={false}/>}>
            <Route path="/admin/dashboard" element={<Dashboard/>}/>
            <Route path="/admin/add_item" element={<Addbook/>}/>
            <Route path="/admin/edit_item/:id" element={<Addbook/>}/>
          </Route>
        </Routes>
    </>
  )
}

export default App
