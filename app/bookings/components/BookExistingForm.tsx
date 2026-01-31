// import React, { useState } from "react";
// // import InfiniteScroll from "react-infinite-scroll-component";
// import { Button, Form, Input, Select, List, Card } from "antd";
// import { Booking } from "../models/Booking";
// import Patient from "../../patients/models/Patient";
// import { PatientT } from "../../patients/types/Patient.type";

// // inputs
// const { Option } = Select;
// const { Search, TextArea } = Input;

// // component
// const BookExistingForm = (props) => {
//   const [form] = Form.useForm();

//   // for search field
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPatientId, setSelectedPatientId] = useState("");
//   const [selectedPatientName, setSelectedPatientName] = useState("");

//   // get patients
//   const { loading, patients } = useGetPatients(searchTerm);

//   // on form submit
//   const onFinish = async (values) => {
//     "use server";

//     const existingPatient = await Patient.findOne({ email: selectedPatientId });

//     if (!existingPatient) {
//       throw new Error("Patient not found");
//     }

//     const booking = new Booking({
//       patient: existingPatient._id,
//       bookingType: values.bookingType,
//       bookingDate: props.bookingDate,
//       bookingStart: props.bookingStart,
//       bookingEnd: props.bookingEnd,
//       bookingNote: values.bookingNote || null,
//     });
//     await booking.save();

//     setSearchTerm("");
//     setSelectedPatientId("");
//     setSelectedPatientName("");

//     props.modalVis(false);
//     form.resetFields();
//   };

//   const onSearch = (value: string) => {
//     setSearchTerm(value);
//     setSelectedPatientId("");
//   };

//   return (
//     <>
//       <Card
//         title="Search for existing patient"
//         // title={
//         //     <Search
//         //         placeholder="search by name, email or mobile number"
//         //         allowClear
//         //         onSearch={onSearch}
//         //         style={{
//         //             marginBottom: '10px',
//         //         }}
//         //     />
//         // }
//         style={{
//           marginBottom: "10px",
//           padding: "0",
//         }}
//       >
//         <Search
//           placeholder="search by name, email or mobile number"
//           allowClear
//           onSearch={onSearch}
//           style={{
//             marginBottom: "10px",
//           }}
//         />
//         {selectedPatientId === "" && searchTerm !== "" ? (
//           <>
//             {loading ? (
//               <p>loading...</p>
//             ) : (
//               <>
//                 <h3>{`Found ${patients.length} patients:`}</h3>
//                 <div
//                   id="scrollableDiv"
//                   style={{
//                     minHeight: "fit-content",
//                     maxHeight: "200px",
//                     overflow: "auto",
//                     padding: "0px",
//                     marginBottom: "10px",
//                     border: "1px solid rgba(140, 140, 140, 0.35)",
//                   }}
//                 >
//                   {/* <InfiniteScroll
//                     dataLength={patients.length}
//                     scrollableTarget="scrollableDiv"
//                   > */}
//                   <List
//                     itemLayout="horizontal"
//                     dataSource={patients}
//                     renderItem={(item: PatientT) => (
//                       <List.Item
//                         className={"patient-record-li"}
//                         onClick={() => {
//                           setSelectedPatientId(item.id);
//                           setSelectedPatientName(
//                             item.firstName + " " + item.lastName
//                           );
//                           setSearchTerm("");
//                         }}
//                       >
//                         <div style={{ width: "100%" }}>
//                           <h3>{`${item.firstName} ${item.lastName}`}</h3>
//                           <h4>{item.email} </h4>
//                         </div>
//                       </List.Item>
//                     )}
//                   />
//                   {/* </InfiniteScroll> */}
//                 </div>
//               </>
//             )}
//           </>
//         ) : (
//           <>
//             <div>
//               <h3>{selectedPatientName}</h3>
//             </div>
//           </>
//         )}
//       </Card>

//       <Form
//         name="basic"
//         labelCol={{
//           span: 6,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         form={form}
//         onFinish={onFinish}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Booking Reason"
//           name="bookingType"
//           hasFeedback
//           wrapperCol={{
//             offset: 2,
//             span: 16,
//           }}
//           rules={[
//             {
//               required: true,
//               message: "Please select a booking type!",
//             },
//           ]}
//         >
//           <Select placeholder="Booking Reason">
//             <Option value="general eye test">General eye test</Option>
//             <Option value="health concern">Health concern</Option>
//             <Option value="rms form">RMS form/Drivers License</Option>
//             <Option value="re-check">Re-check</Option>
//             <Option value="other">Other</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item
//           label="Booking Notes"
//           name="bookingNote"
//           hasFeedback
//           wrapperCol={{
//             offset: 2,
//             span: 16,
//           }}
//         >
//           <TextArea />
//         </Form.Item>

//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             Book patient
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// };

// export default BookExistingForm;
