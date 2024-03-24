// import React, { useState, useEffect } from "react";
// import { z } from "zod";
// import {
//   FormField,
//   initializeForm,
//   resetFormKeepFieldValues,
// } from "../form/Form.tsx";
// import Modal from "../modal/Modal.tsx";
// import ModalButton from "../modal/ModalButton.tsx";
// import { CanceledError } from "../../services/api-client.ts";


// // create a Zod schema for validation
// const schema = z.object({
//   feedback: z.string().max(450, "Feedback has too many characters."),
//   area_of_growth: z
//     .string()
//     .max(450, "Feedback has too many characters.")
//     .optional(),
//   next_steps: z
//     .string()
//     .max(450, "Next Steps has too many characters.")
//     .optional(),
//   learning_area_proficiency_id: z.string().optional(),
// });

// interface FormPopSummaryProps {
//   row: any;
//   icon: string;
//   feedbackLabel: string;
//   areaOfGrowthLabel: string;
//   nextStepsLabel: string;
//   modalTitle: string;
//   onGridRefresh: () => void;
// }

// const FormPopSummary: React.FC<FormPopSummaryProps> = (props) => {
//   const {
//     row,
//     icon,
//     feedbackLabel,
//     areaOfGrowthLabel,
//     nextStepsLabel,
//     modalTitle,
//     onGridRefresh,
//   } = props;

//   // state variable to hold learning area proficiencies
//   const [radioButtonGroup, setRadioButtonGroup] = useState<any[]>([]);

//   // state variable to hold the form fields
//   // that need to be rendered in text elements
//   const [formFields, setFormFields] = useState<FormField[]>();

//   // state variable to hold form errors
//   const [formError, setFormError] = useState({
//     isError: false,
//     type: "danger",
//     message: "No error at this time.",
//   });

//   // state variable to track whether there
//   // are unsaved changes in the form
//   const [dataSaved, setDataSaved] = useState(false);

//   const [disableField, setDisableField] = useState(false);

//   // initialize the form using the generic form component
//   // it sets up validation using zod and manages form values,
//   // submission and error handling
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     resetField,
//     formState: { errors, isDirty },
//   } = initializeForm({
//     schema,
//     defaultValues: {
//       feedback: row.feedback,
//       area_of_growth: row.area_of_growth,
//       next_steps: row.next_steps,
//       learning_area_proficiency_id: row.learning_area_proficiency_id,
//     },
//     onSubmit: () => {
//       // handle form submission
//     },
//   });

//   // fetch learning area proficiencies
//   useEffect(() => {
//     const { request, cancel } = learningAreaProficienciesService.getId(
//       row.learning_area_id
//     );
//     // response data is used to update "principal" state variable
//     request
//       .then((res) =>
//         setRadioButtonGroup([
//           {
//             name: "learning_area_proficiency_id",
//             label: "",
//             values: res.data,
//             default: row.learning_area_proficiency_id,
//           },
//         ])
//       )
//       .catch((err) => {
//         // check if error is axios's CanceledError if not
//         // error message is stored in "error" state variable
//         if (err instanceof CanceledError) return;
//         setFormError({
//           isError: true,
//           type: "danger",
//           message: "Proficiencies for Learning Area are not found.",
//         });
//       });

//     // clean up function cancels request when component
//     // is unmounted. prevents memory leaks
//     return () => cancel();
//   }, [row]);

//   // fetch generated text
//   // useEffect(() => {
//   //   const request = popSummaryGenerateTextService.create({
//   //     point_of_progress_summary_id: row.point_of_progress_summary_id,
//   //   });
//   //   // response data is used to update "principal" state variable
//   //   request
//   //     .then((res) => {
//   //       // Parse the JSON string
//   //       const resultObj: Record<string, string> = JSON.parse(res.data);
//   //    const strengthElement: string = resultObj.strength;
//   //       // Extract the "strength" element
//   //       setGeneratedStrength(strengthElement)
//   //       // setGeneratedAreaOfGrowth(resultObj.areaOfGrowth)
//   //       // setGeneratedNextSteps(resultObj.nextSteps)

//   //       console.log("generatedText", strengthElement);
//   //     })
//   //     .catch((err) => {
//   //       // check if error is axios's CanceledError if not
//   //       // error message is stored in "error" state variable
//   //       if (err instanceof CanceledError) return;
//   //       setFormError({
//   //         isError: true,
//   //         message: "Did not generate text.",
//   //       });
//   //     });
//   // }, [row]);

//   // form fields initialized with values from "row"
//   // prop using "react-hook-form" setValue function
//   // "" added to value to force save on first change
//   useEffect(() => {
//     setValue("feedback", row.feedback + "");
//     setValue("area_of_growth", row.area_of_growth + "");
//     setValue("next_steps", row.next_steps + "");
//     setFormFields([
//       {
//         fieldName: "feedback",
//         label: feedbackLabel,
//         placeholder: row.feedback,
//       },
//       {
//         fieldName: "area_of_growth",
//         label: areaOfGrowthLabel,
//         placeholder: row.area_of_growth,
//       },
//       {
//         fieldName: "next_steps",
//         label: nextStepsLabel,
//         placeholder: row.next_steps,
//       },
//     ]);
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
//     setFormError({ isError: false, type:"danger", message: "No errors at this time." });
//     try {
//       popSummaryClassStudentService.update(
//         row.point_of_progress_summary_id,
//         getValues()
//       );
//       resetFormKeepFieldValues(
//         [
//           "feedback",
//           "area_of_growth",
//           "next_steps",
//           "learning_area_proficiency_id",
//         ],
//         setValue,
//         getValues,
//         //   reset,
//         resetField
//       );
//       setDataSaved(true);
//     } catch (error) {
//       setFormError({
//         isError: true,
//         type: "danger",
//         message: "Point of Progress Summary text did not save.",
//       });
//     }
//   };

//   const handleGenerateText = () => {
//     setFormError({
//       isError: true,
//       type: "warning",
//       message: "Generating text from OpenAi can take a few seconds ... ",
//     });
//       setDisableField(true);
//     const request = popSummaryGenerateTextService.create({
//       point_of_progress_summary_id: row.point_of_progress_summary_id,
//       student: row.first_name
//     });
//     // response data is used to update "principal" state variable
//     request
//       .then((res) => {
//         // Parse the JSON string
//         const resultObj: Record<string, string> = JSON.parse(res.data);

//         setValue(
//           "feedback",
//           `${row.feedback}Generated Text: ${resultObj.strength}`
//         );
//         setValue(
//           "area_of_growth",
//           `${row.area_of_growth}Generated Text: ${resultObj.areaOfGrowth}`
//         );
//         setValue(
//           "next_steps",
//           `${row.next_steps}Generated Text: ${resultObj.nextSteps}`
//         );
//         setFormError({
//           isError: false,
//           type: "warning",
//           message: "",
//         });
//         setDataSaved(false);
//         setDisableField(false);
//       })
//       .catch((err) => {
//         // check if error is axios's CanceledError if not
//         // error message is stored in "error" state variable
//         if (err instanceof CanceledError) return;
//         setFormError({
//           isError: true,
//           type: "warning",
//           message: "Did not generate text.",
//         });
//       });
//   };

//   return (
//     <>
//       <ModalButton
//         id={row.point_of_progress_summary_id}
//         pop_state_type_id={row.point_of_progress_state_type_id}
//         icon={icon}
//       />

//       <Modal
//         id={row.point_of_progress_summary_id}
//         title={modalTitle}
//         radioButtonGroup={radioButtonGroup}
//         textElementSize={6}
//         formFields={formFields}
//         disableField={disableField}
//         register={register}
//         setValue={setValue}
//         handleSubmit={handleSubmit}
//         errors={errors}
//         formError={formError}
//         dataSaved={dataSaved}
//         onSubmit={onSubmit}
//         onGenerateText={handleGenerateText}
//         onGridRefresh={onGridRefresh}
//       />
//     </>
//   );
// };

// export default FormPopSummary;
