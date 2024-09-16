import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import VerifyEmail from '../pages/VerifyEmail'
import EmailVerification from '../pages/EmailVerification'
import HomePage from '../pages/HomePage'
import AddDepartment from '../pages/AddDepartment'
import AddCourse from '../pages/AddCourse'
import DepartmentList from '../pages/DepartmentList'
import EditDepartment from '../pages/EditDepartment'
import AllCourse from '../pages/AllCourse'
import EditCourse from '../pages/EditCourse'
import CourseInfo from '../pages/CourseInfo'
import AddStudent from '../pages/AddStudent'
import AllStudent from '../pages/AllStudent'
import StudentProfile from '../pages/StudentProfile'
import EditStudent from '../pages/EditStudent'
import SingleStudent from '../pages/SingleStudent'
import PageNotFound from '../pages/PageNotFound'
import { ForgotPassword } from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import Sent from '../pages/Sent'
import Access from '../pages/Access'
// import Accounts from '../pages/Accounts'
import Accounting from '../pages/Accounting'
import UpdateAccount from '../pages/UpdateAccount'
import UpdatePayment from '../pages/UpdatePayment'
import PaymentDetails from '../pages/PaymentDetails'
import PaymentInfo from '../pages/PaymentInfo'
import AddPayment from '../pages/AddPayment'

const MyRoute = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
        <Route path="/verification" element={<EmailVerification />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/Success" element={<Sent />} />
        <Route path="/resetPassword/:token/:id" element={<ResetPassword />} />
        <Route path="/addDepartment" element={<ProtectedRoute><AdminRoute><AddDepartment /></AdminRoute></ProtectedRoute>} />
        <Route path="/addpayments" element={<ProtectedRoute><AdminRoute><AddPayment /></AdminRoute></ProtectedRoute>} />
        <Route path="/updatepayment" element={<ProtectedRoute><AdminRoute><UpdatePayment /></AdminRoute></ProtectedRoute>} />
        <Route path="/paymentdetails" element={<ProtectedRoute><AdminRoute><PaymentDetails /></AdminRoute></ProtectedRoute>} />
        <Route path="/updateaccount/:id/:student/:course" element={<ProtectedRoute><AdminRoute><UpdateAccount /></AdminRoute></ProtectedRoute>} />
        <Route path="/paymentinfo/:id/:student/:course" element={<ProtectedRoute><AdminRoute><PaymentInfo /></AdminRoute></ProtectedRoute>} />
        <Route path="/accounting/:id/:course_id" element={<ProtectedRoute><AdminRoute><Accounting /></AdminRoute></ProtectedRoute>} />
        <Route path="/addCourse" element={<ProtectedRoute><AdminRoute><AddCourse /></AdminRoute></ProtectedRoute>} />
        <Route path="/allCourse" element={<ProtectedRoute><AdminRoute><AllCourse /></AdminRoute></ProtectedRoute>} />
        <Route path="/departmentList" element={<ProtectedRoute><AdminRoute><DepartmentList /></AdminRoute></ProtectedRoute>} />
        <Route path="/editDepartment/:id" element={<ProtectedRoute><AdminRoute><EditDepartment /></AdminRoute></ProtectedRoute>} />
        <Route path="/editCourse/:id" element={<ProtectedRoute><AdminRoute><EditCourse /></AdminRoute></ProtectedRoute>} />
        <Route path="/courseInfo" element={<ProtectedRoute><AdminRoute><CourseInfo /></AdminRoute></ProtectedRoute>} />
        <Route path="/addStudent" element={<ProtectedRoute><AdminRoute><AddStudent /></AdminRoute></ProtectedRoute>} />
        <Route path="/allStudent" element={<ProtectedRoute><AdminRoute><AllStudent /></AdminRoute></ProtectedRoute>} />
        <Route path="/studentProfile" element={<ProtectedRoute><AdminRoute><StudentProfile /></AdminRoute></ProtectedRoute>} />
        <Route path="/editStudent/:id" element={<ProtectedRoute><AdminRoute><EditStudent /></AdminRoute></ProtectedRoute>} />
        <Route path="/StudentProfile/:id" element={<ProtectedRoute><AdminRoute><SingleStudent /></AdminRoute></ProtectedRoute>} />
        <Route path='/access' element={<ProtectedRoute><AdminRoute><Access /></AdminRoute></ProtectedRoute>} />
      </Routes>
    </>
  )
}
export function ProtectedRoute({ children }) {
  if (localStorage.getItem('USER')) {
    return children;
  }
  else {
    return <Navigate to="/login" />
  }
}
export function AdminRoute({ children }) {
  const login = JSON.parse(localStorage.getItem('USER'))
  if (login.user.role === "Admin") {
    return children;
  }
  else {
    return <Navigate to="*" />
  }
}
export default MyRoute