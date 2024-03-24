import { ReactNode } from "react";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  DeepPartial,
  Path,
} from "react-hook-form";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// form field interface
export interface FormField {
  fieldName: string;
  label: string;
  placeholder: any;
}

// generic props for the form component
interface FormProps<T extends FieldValues> {
  schema: ZodSchema<T>; // zod schema for validation
  defaultValues?: T; // default values for the form fields
  onSubmit: SubmitHandler<T>; // form submission handler
}

// initializes the form component - it
// takes generic argument T and recieves
// a FormProps object as a parameter
export const initializeForm = <T extends FieldValues>({
  schema,
  defaultValues,
}: FormProps<T>) => {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DeepPartial<T>,
  });
};

// generic form reset and set field to original values
export const resetFormFields = <T extends FieldValues>(
  // fields: K[],
  // setValue: (
  //   name: K,
  //   value: FieldValues[K],
  //   config?: { shouldValidate?: boolean }
  // ) => void,
  // getValues: (fieldNames?: K[]) => FieldValues,
  reset: (values?: DeepPartial<T>) => void
) => {
  //const values = getValues();
  reset();

  // fields.forEach((field) => {
  //   setValue(field, values[field]);
  // });
};

// generic form reset but retains field values
export const resetFormKeepFieldValues = <
  T extends FieldValues,
  K extends Path<T>
>(
  fields: K[],
  setValue: (
    name: K,
    value: FieldValues[K],
    config?: { shouldValidate?: boolean }
  ) => void,
  getValues: (fieldNames?: K[]) => FieldValues,
  //reset: (values?: DeepPartial<T>) => void,
  resetField: (value: K) => void
) => {
  const values = getValues();

  //reset();

  fields.forEach((field) => {
    resetField(field);
  });

  fields.forEach((field) => {
    setValue(field, values[field]);
  });
};

// renders a generic input element for the form - if
// there are errors for the corresponding field, an
// error messages is displayed
//
// T extends FieldValues: The generic type parameter T
// is constrained to extend the FieldValues type. FieldValues
// is a generic type provided by the react-hook-form library,
// representing the form values object.

// K extends Path<T>: The generic type parameter K is constrained
// to extend the Path<T> type. Path<T> is a generic type provided by the
// react-hook-form library, representing a path to a specific
// field in the form values object.

// register is a function provided by react-hook-form
// to register the input element with the form.
//
// errors is an object provided by react-hook-form
// that contains validation errors for the form fields.
export const renderInputElement = <T extends FieldValues, K extends Path<T>>(
  fieldName: K,
  type: string,
  placeholder: string,
  register: any,
  setValue: (
    name: K,
    value: string,
    option?: { shouldValidate: boolean }
  ) => void,
  isDisabled: boolean,
  errors: any
) => {
  return (
    <div className="mb-3">
      <input
        {...register(fieldName)}
        id={fieldName as string}
        type={type}
        className="form-control"
        name={fieldName as string}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(fieldName, e.target.value, { shouldValidate: true });
        }}
      />
      {errors[fieldName] && (
        <div className="alert alert-info error-message" role="alert">
          {errors[fieldName]?.message as ReactNode}
        </div>
      )}
    </div>
  );
};

// renders a generic read only input field for the form
export const renderInputElementReadOnly = <
  T extends FieldValues,
  K extends Path<T>
>(
  fieldName: K,
  type: string,
  placeholder: string,
  register: any,
  errors: any
  // isValid: boolean
) => {
  return (
    <div className="mb-3">
      <input
        {...register(fieldName)}
        id={fieldName as string}
        type={type}
        className="form-control"
        name={fieldName as string}
        placeholder={placeholder}
        readOnly={true}
      />
      {errors[fieldName] && (
        <div className="alert alert-info error-message" role="alert">
          {errors[fieldName]?.message as ReactNode}
        </div>
      )}
    </div>
  );
};

// renders generic text area for the form
export const renderTextElement = <T extends FieldValues, K extends Path<T>>(
  fieldName: K,
  label: string,
  placeholder: string,
  rows: number,
  register: any,
  setValue: (
    name: K,
    value: string,
    option?: { shouldValidate: boolean; shouldDirty: boolean }
  ) => void,
  isDisabled: boolean,
  errors: any
  // isValid: boolean
) => {
  return (
    <div className="mb-3">
     { label && <span className="input-group-text">{label}</span>} 
      <textarea
        {...register(fieldName)}
        id={fieldName as string}
        className="form-control"
        name={fieldName as string}
        placeholder={placeholder}
        rows={rows}
        disabled={isDisabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(fieldName, e.target.value, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
      />
      {errors[fieldName] && (
        <div className="alert alert-info error-message" role="alert">
          {errors[fieldName]?.message as ReactNode}
        </div>
      )}
    </div>
  );
};

// render generic choose file element for form
export const renderChooseFileElement = <
  T extends FieldValues,
  K extends Path<T>
>(
  fieldName: K,
  register: any,
  onFileChange: (field: string, files: FileList | null) => void,
  errors: any,
  isDisabled: boolean
) => {
  return (
    <div className="mb-3">
      <input
        {...register(fieldName)}
        id={fieldName as string}
        type={"file"}
        className="form-control"
        name={fieldName as string}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onFileChange(e.target.name, e.target.files)
        }
        disabled={isDisabled}
      />
      {errors[fieldName] && (
        <div className="alert alert-info error-message" role="alert">
          {errors[fieldName]?.message as ReactNode}
        </div>
      )}
    </div>
  );
};

// render generic radio button group for form
export const renderRadioButtonGroupElement = <
  T extends FieldValues,
  K extends Path<T>
>(
  fieldName: K,
  radioButtonGroup: any,
  //onRadioButtonChange: (value: any) => void,
  register: any,
  isDisabled: boolean,
  // setValue: (name: K, value: any, option?:{ shouldValidate: boolean, shouldDirty: boolean}) => void,
  errors: any
) => {
  return (
    <div>
    


      <div
        {...register(fieldName)}
        className="form-group text-end"
        key={`radioButton${radioButtonGroup.name}`}
        id={`radioButton${radioButtonGroup.name}`}
        name={`radioButton${radioButtonGroup.name}`}
      >
      
  {radioButtonGroup.label && (
        <label htmlFor={`radioButton${radioButtonGroup.name}`} className="form-label h6 fw-bold me-1">
          {radioButtonGroup.label + ":"}
        </label>
      )}

        {/* <label
          key={"label" + radioButtonGroup.name}
          htmlFor={`radioButton${radioButtonGroup.name}`}
          className="form-label text-primary me-3"
        ></label> */}

        {/* input for a "None" choice ... add back in the future.
          <div  className = " form-group form-check form-check-inline" key = {0} > 
              <input 
                  className = "form-check-input" 
                  name = {radioButtonGroup.name}
                  type = "radio" 
                  key = {"input" + 0} 
                  id = {"id" + 0} 
                  defaultChecked
                 // checked = {0 === checkedButton}
                 // onClick = { (e) => setCheckedButton(0) }                  
                  value = {0} />

              <label 
                  className = {"form-check-label"}
                  key = {"label" + 0} 
                  htmlFor = {"id" + 0}
              >None</label>
          </div> */}

        {radioButtonGroup.values.map((value: any) => (
          <div className="form-check form-check-inline" key={value.id}>
            <input
              {...register(fieldName)}
              className="form-check-input"
              name={radioButtonGroup.name}
              type="radio"
              key={"input" + value.id}
              id={"id" + value.id}
              defaultChecked={
                value.id === radioButtonGroup.default ? true : false
              }
              value={parseInt(value.id)}
              disabled={isDisabled}
            />

            <label
              className={"form-check-label"}
              key={"label" + value.id}
              htmlFor={"id" + value.id}
            >
              {value.label}
            </label>
          </div>
        ))}
      </div>
      {errors[fieldName] && (
        <div className="alert alert-info error-message" role="alert">
          {errors[fieldName]?.message as ReactNode}
        </div>
      )}
    </div>
  );
};


// render generic radio button group for form
export const renderCheckBoxGroupElement = <
  T extends FieldValues,
  K extends Path<T>
>(
  fieldName: K,
  checkBoxGroup: any,
  //onRadioButtonChange: (value: any) => void,
  register: any,
  isDisabled: boolean,
  // setValue: (name: K, value: any, option?:{ shouldValidate: boolean, shouldDirty: boolean}) => void,
  errors: any
) => {
  return (
    <div>
      <div
        {...register(fieldName)}
        className="form-group"
        key={`checkBox${checkBoxGroup.name}`}
        id={`checkBox${checkBoxGroup.name}`}
        name={`checkBox${checkBoxGroup.name}`}
      >
        {/* <label
          key={"label" + radioButtonGroup.name}
          htmlFor={`radioButton${radioButtonGroup.name}`}
          className="form-label text-primary me-3"
        ></label> */}

        {/* input for a "None" choice ... add back in the future.
          <div  className = " form-group form-check form-check-inline" key = {0} > 
              <input 
                  className = "form-check-input" 
                  name = {radioButtonGroup.name}
                  type = "radio" 
                  key = {"input" + 0} 
                  id = {"id" + 0} 
                  defaultChecked
                 // checked = {0 === checkedButton}
                 // onClick = { (e) => setCheckedButton(0) }                  
                  value = {0} />

              <label 
                  className = {"form-check-label"}
                  key = {"label" + 0} 
                  htmlFor = {"id" + 0}
              >None</label>
          </div> */}

        {checkBoxGroup.values.map((value: any) => (
          <div className="form-check form-check-inline" key={value.id}>
            <input
              {...register(fieldName)}
              className="form-check-input"
              name={checkBoxGroup.name}
              type="checkbox"
              key={"input" + value.id}
              id={"id" + value.id}
              defaultChecked={
                value.id === checkBoxGroup.default ? true : false
              }
              value={parseInt(value.id)}
              disabled={isDisabled}
            />

            <label
              className={"form-check-label"}
              key={"label" + value.id}
              htmlFor={"id" + value.id}
            >
              {value.label}
            </label>
          </div>
        ))}
      </div>
      {errors[fieldName] && (
        <div className="alert alert-info error-message" role="alert">
          {errors[fieldName]?.message as ReactNode}
        </div>
      )}
    </div>
  );
};


// generic alert for displaying an error message
export const renderAlert = (type: string, message: string) => {
  return (
    <div className="mb-3">
      <div
        key={type}
        className={`alert alert-${type} error-message`}
        role="alert"
      >
        {message}
      </div>
    </div>
  );
};

// generic alert for displaying an error message
export const renderAlerts = (alerts: { type: string; message: string }[]) => {
  return (
    <div className="mb-3">
      {alerts.map((alert, index) => (
        <div
          key={alert.type + index}
          className={`alert alert-${alert.type} error-message`}
          role="alert"
        >
          {alert.message}
        </div>
      ))}
    </div>
  );
};

export const renderButton = (
  label: string,
  className: string,
  onClick: () => void
) => {
  return (
    <button type="button" onClick={onClick} className={`${className}`}>
      {label}
    </button>
  );
};

// submit button used in modal edit forms
export const renderSubmitButton = (
  labelDataUnsaved: string,
  labelDataSaved: string,
  classNameDataUnsaved: string,
  classNameDataSaved: string,
  isDisabled: boolean
) => {
  return (
    <button
      type="submit"
      className={isDisabled ? classNameDataSaved : classNameDataUnsaved}
      disabled={isDisabled}
    >
      {isDisabled ? labelDataSaved : labelDataUnsaved}
    </button>
  );
};
