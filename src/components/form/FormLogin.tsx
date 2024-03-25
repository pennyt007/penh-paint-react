import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { initializeForm, renderAlert, renderInputElement } from "./Form.tsx";
import { FieldValues } from "react-hook-form";
import authenticationService from "../../services/authentication-service.ts";
import { getCurrentUser } from "../../services/user-service.ts";
import { User } from "../../services/user-service.ts";

// create a Zod schema for validation
const schema = z.object({
  email: z
    .string()
    .email({ message: "Email is invalid" })
    .max(50, "Email has too many characters")
    .nonempty(),
  password: z
    .string()
    .min(6, "Password is invalid")
    .max(20, "Password is invalid")
    .nonempty(),
});

type FormLoginProps = {
  setUser: (user: User) => void;
};

// the FormLogin component is a functional component defined using
// the React.FC type. It expects a prop called setUser of type
// (user: User) => void. This prop is used to set the user in the parent component.

const FormLogin: React.FC<FormLoginProps> = ({ setUser }) => {
  const [formError, setFormError] = useState({ isError: false, message: "" });

  // initialize useNavigate
  const navigate = useNavigate();

  // initialize the form using the generic form component
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = initializeForm({
    schema,
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      // handle form submission
    },
  });

  // authenticate user login
  const onSubmit = async (data: FieldValues) => {
    setFormError({ isError: false, message: "" });

    try {
      // attempt to authenticate user login
      await authenticationService.login(data);
  
      // fetches current user
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        setFormError({
          isError: true,
          message: "Login attempt failed: decode user unsuccessful.",
        });
      } else {
        // if login successful and current user retrieved
        // setUser prop is called to set user in App.tsx
        setUser(currentUser);
        const userRole = currentUser.user.user_role;
        
        if (userRole === "MANAGER") {
          navigate("/manager");
        }
        if (userRole === "PAINTER") {
          navigate("/painter");
        }

      }
    } catch (error) {
      setFormError({
        isError: true,
        message: "Login attempt failed: email/password is invalid.",
      });
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="pt-2 pb-1">
            <h5 className="card-title text-center pb-1 fs-4">
              Login to Your Account
            </h5>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            action="forms/contact.php"
            method="post"
            className="php-email-form"
          >
            {/* render error message */}
            {formError.isError &&
              renderAlert("danger", formError.message)}

            {/* render email input element */}
            {renderInputElement(
              "email",
              "email",
              "Email",
              register,
              setValue,
              false,
              errors
            )}

            {/* render password input element */}
            {renderInputElement(
              "password",
              "password",
              "Password",
              register,
              setValue,
              false,
              errors
              //isValid
            )}

            {/* submit button */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormLogin;
