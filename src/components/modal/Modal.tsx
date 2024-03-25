import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import {
  FormField,
  renderAlert,
  renderRadioButtonGroupElement,
  renderSubmitButton,
  renderTextElement,
} from "../form/Form.tsx";
// import { boolean } from "zod";
// import { useState } from "react";

interface ModalProps<T extends FieldValues, K extends Path<T>> {
  id: string;
  title: string;
  radioButtonGroup: any;
  textElementSize: number;
  //onRadioButtonChange: (value: any) => void;
  formFields: FormField[] | undefined;
  disableField: boolean;
  register: UseFormRegister<{
    feedback: any;
    area_of_growth?: any;
    next_steps?: any;
    learning_area_proficiency_id?: any;
  }>;
  setValue: (
    name: K,
    value: any,
    option?: { shouldValidate: boolean; shouldDirty: boolean }
  ) => void;
  handleSubmit: UseFormHandleSubmit<{
    feedback: any;
    area_of_growth?: any;
    next_steps?: any;
    learning_area_proficiency_id?: any;
  }>;
  errors: FieldErrors<{ T: any }>;
  formError: {
    isError: boolean;
    type: string;
    message: string;
  };
  dataSaved: boolean;
  onSubmit: () => void;
  onGenerateText: () => void;
  onGridRefresh: () => void;
}

const Modal: React.FC<
  ModalProps<
    [
      {
        feedback: any;
        area_of_growth?: any;
        next_steps?: any;
        learning_area_proficiency_id?: any;
      }
    ],
    any
  >
> = (props) => {
  const {
    id,
    title,
    radioButtonGroup,
    textElementSize,
    formFields,
    disableField,
    register,
    setValue,
    handleSubmit,
    errors,
    formError,
    dataSaved,
    onSubmit,
    onGenerateText,
    onGridRefresh,
  } = props;


  return (
    <>
      <div
        className="modal fade"
        role="dialog"
        id={`modalPopUp${id}`}
        data-bs-backdrop="false"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            method="post"
            className=""
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  {title}
                </h5>
                {/* <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button> */}
              </div>
              {/* modal contains form for editing and uses "handleSubmit"
                from "react-hook-form" to handle submission */}
              <div className="modal-body">
                <center>
                  <div>
                    {/* render error message */}
                    {formError.isError &&
                      renderAlert(formError.type, formError.message)}

                    {radioButtonGroup &&
                      radioButtonGroup.map((group: any) => (
                        <div key={group.name}>
                          <div className="row">
                            <div className="col mb-3">
                              {renderRadioButtonGroupElement(
                                group.name,
                                group,
                                // onRadioButtonChange,
                                register,
                                disableField,
                                // setValue,
                                errors
                              )}
                            </div>{" "}
                          </div>
                        </div>
                      ))}

                    {formFields &&
                      formFields.map((field) => (
                        <div key={field.fieldName}>
                          {renderTextElement(
                            field.fieldName,
                            field.label,
                            field.placeholder,
                            textElementSize,
                            register,
                            setValue,
                            disableField,
                            errors
                          )}
                        </div>
                      ))}
                  </div>
                </center>
              </div>
              {/* modal footer has "Close" button that
                calls "onGridRefresh" to update data in grid
                after changes are made and modal is closed */}
              <div className="modal-footer">
              <button
                  onClick={() => {
                    onGenerateText();
                  }}
                  type="button"
                  className="btn btn-info mb-3"
                  // data-bs-dismiss="modal"
                >
                  Generate Text
                </button>
                {renderSubmitButton(
                  "Click to Save Changes",
                  "Text is Saved",
                  "btn btn-danger mb-3",
                  "btn btn-secondary mb-3 disabled",
                  dataSaved
                )}

                <button
                  onClick={() => {
                    onGridRefresh();
                  }}
                  type="button"
                  className="btn btn-warning mb-3"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
