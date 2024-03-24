
const Error = () => {
  return (
    <>
      <section id="error" className="error">
        <div className="container mt-3">
          <div className="row">
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
              <div className="card">
                <div className="card-header text-center">
                  <h5>Ooops Something went wrong!</h5>
                </div>
                <img
                  src="src/assets/error.png"
                  className="card-img-top"
                  alt="..."
                ></img>
                <div className="card-icon">
                  <i className="bx bx-book-reader"></i>
                </div>

                <div className="card-body">
                  <h5 className="card-title">
                    <a href="/"></a>
                  </h5>
                  <p className="card-text"></p>
                </div>
                <div className="card-footer">
                  <h6>
                    Sorry for the inconvience, we are working on it. In the
                    meantime you can put in another load of laundry ...
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
