interface ModalButtonProps {
  id: string;
  pop_state_type_id: number;
  icon: string;
}

const ModalButton: React.FC<ModalButtonProps> = (props) => {
  const { id, pop_state_type_id, icon } = props;
  
  // point_of_progress_state_type_id higher than 15 means
  // form data is in draft or revision and cannot be edited
  if (pop_state_type_id > 15) {
    return (
      <button type="button" className="btn btn-sm btn-secondary">
        <i className={icon}></i>
      </button>
    );
  }

  // point_of_progress_state_type_id less than 15 means
  // form data is in draft or revision and can be edited
  if (pop_state_type_id < 20) {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-warning"
          data-bs-toggle="modal"
          data-bs-target={`#modalPopUp${id}`}
        >
          <i className={icon}></i>
        </button>
      </div>
    );
  }
  return null;
};

export default ModalButton;
