// import React, { useState, useEffect } from "react";
// import { z } from "zod";
// import { FormField, initializeForm, resetFormKeepFieldValues } from "../form/Form.tsx";
// import { behaviourClassStudentService } from "../../services/behaviour-service";
// import Modal from "../modal/Modal.tsx";
// import ModalButton from "../modal/ModalButton.tsx";

// // create a Zod schema for validation
// const schema = z.object({
//   feedback: z.string().max(5000, "Feedback has too many characters."),
//  // next_steps: z.string().max(5000, "Next Steps has too many characters."),
// });

// interface FormBehaviourProps {
//   row: any;
//   icon: string;
//   onGridRefresh: () => void;
// }

// const FormOrder: React.FC<FormBehaviourProps> = (props) => {

//   const { row, icon, onGridRefresh } = props;

//   // state variable to hold the form fields
//   // that need to be rendered in text elements
//   const [formFields, setFormFields] = useState<FormField[]>();

//   // state variable to hold form errors
//   const [formError, setFormError] = useState({
//     isError: false,
//     type: "danger",
//     message: "No errors at this time.",
//   });

//   // state variable to track whether there
//   // are unsaved changes in the form
//   const [dataSaved, setDataSaved] = useState(false);

//   // state variable to handle error messages
//   //const [error, setError] = useState("");

//   // initialize the form using the generic form component
//   // it sets up validation using zod and manages form values,
//   // submission and error handling
//   const {
//     register,
//     trigger,
//     handleSubmit,
//     setValue,
//     getValues,
//     resetField,
//     formState: { errors, isDirty },
//   } = initializeForm({
//     schema,
//     defaultValues: {
//       feedback: row.feedback,
//     //  next_steps: row.next_steps,
//     },
//     onSubmit: () => {
//       // handle form submission
//     },
//   });

//   // form fields initialized with values from "row"
//   // prop using "react-hook-form" setValue function
//   // "" added to value to force save on first change
//   useEffect(() => {
//     setValue("feedback", row.feedback + "");
//    // setValue("next_steps", row.next_steps + "");
//     setFormFields([
//       { fieldName: "feedback", label: "Global Comment", placeholder: row.feedback },
//       // {
//       //   fieldName: "next_steps",
//       //   label: "Next Steps",
//       //   placeholder: row.next_steps,
//       // },
//     ]);
//     trigger("feedback")
//    // trigger("next_steps")
//   }, [row]);

//   // set state variable indicating values in
//   // form have changed and need to be submitted ("saved")
//   useEffect(() => {
//     setDataSaved(!isDirty);
//   }, [isDirty]);

//   // responsible for submitting form data. If data
//   // updated to database successfully the form fields
//   // are reset and "needToSaveData" is set to false
//   const onSubmit = async () => {
//     setFormError({ isError: false, type: "danger", message: "No errors at this time." });
//     try {
//       // need to update engageBehave data here
//       behaviourClassStudentService.update(
//         row.engagement_behaviour_id,
//         getValues()
//       );
//       resetFormKeepFieldValues(["feedback"], setValue, getValues, resetField);
//       setDataSaved(true);
//     } catch (error) {
//       setFormError({
//         isError: true,
//         type: "danger",
//         message: "Behaviour text did not save.",
//       });
//     }
//   };

//   return (
//     <>
//       <ModalButton
//         id={row.engagement_behaviour_id}
//         pop_state_type_id={row.point_of_progress_state_type_id}
//         icon={icon}
//       />

//       <Modal
//         id={row.engagement_behaviour_id}
//         title={`Edit Global Comment`}
//         radioButtonGroup={null}
//         textElementSize = {10}
//         formFields={formFields}
//         disableField={false}
//         register={register}
//         setValue={setValue}
//         handleSubmit={handleSubmit}
//         errors={errors}
//         formError={formError}
//         dataSaved={dataSaved}
//         onSubmit={onSubmit}
//         onGenerateText={() => {   setFormError({
//           isError: true,
//           type: "warning",
//           message: "Generating text from OpenAi is not available here.",
//         });}}
//         onGridRefresh={onGridRefresh}
//       />
//     </>
//   );
// };

// export default FormOrder;
