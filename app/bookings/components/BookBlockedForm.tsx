// import React from "react";
// import { Button, Form, Input } from "antd";

// const BookBlockedForm = (props) => {
//   const [form] = Form.useForm();

//   // on form submit
//   const onFinish = async (values) => {
//     const booking = new Booking({
//       type: "blocked",
//       bookingTime: props.bookingDate,
//       durationMins: props.bookingStart,
//       note: values.bookingNote || null,
//       status: null,
//       reason: null,
//     });
//     await booking.save();

//     props.modalVis(false);
//     form.resetFields();
//   };

//   return (
//     <>
//       <Form
//         name="basic"
//         labelCol={{
//           span: 4,
//         }}
//         wrapperCol={{
//           span: 18,
//         }}
//         form={form}
//         onFinish={onFinish}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Notes"
//           name="bookingNote"
//           hasFeedback
//           wrapperCol={{
//             offset: 2,
//             span: 16,
//           }}
//         >
//           <Input.TextArea />
//         </Form.Item>

//         <Form.Item
//           wrapperCol={{
//             offset: 6,
//             span: 16,
//           }}
//         >
//           <Button htmlType="submit">Block</Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// };

// export default BookBlockedForm;
