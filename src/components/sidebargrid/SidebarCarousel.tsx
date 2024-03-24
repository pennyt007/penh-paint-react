import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SidebarCarouselInterface, sidebarCarouselService } from "../../services/gridsidebar-service-python";
import { CanceledError } from "axios";

interface SidebarCarouselProps<T> {
  sidebarId: number;
  items: T[];
  itemSelected: T | null;
  onItemChanged: (student: T) => void;
  onError: (error: string) => void;
}

// react functional component renders a carousel in sidebar
const SidebarCarousel: React.FC<SidebarCarouselProps<any>> = (props) => {

  // destructing
  const { sidebarId, items, itemSelected, onItemChanged, onError } = props;

  // state variables
  const [error, setError] = useState("");
  const [carousel, setCarousel] = useState<SidebarCarouselInterface[]>([]);

  // component constant
  const maxIndex = items.length ? items.length - 1 : 0;

  // effects
  useEffect(() => {
    const { request, cancel } =
      sidebarCarouselService.getNested<SidebarCarouselInterface[]>(sidebarId);

    request
      .then((res) => setCarousel(res.data))
      // check if error is axios's CanceledError if not
      // error message is stored in "error" state variable
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(`Student Carousel is not working: ${err.message}`);
      });

    // clean up function cancels request when
    // componenet is unmounted to prevent memory leaks
    return () => cancel();
  }, [sidebarId]);

  // render
  return (
    <>
      {error &&
        toast.error(error, {
          onClick: () => onError(error),
          onClose: () => onError(error),
          className: "custom-toast",
          autoClose: false,
        })}
      {carousel.length > 0 && (
        <div className="card">
          <div className="card-title"></div>
          <div className="card-body">
            <div
              id="carouselWithCaptions"
              className="carousel-light slide"
              data-bs-interval="false"
            >
              {/* single item in the carousel */}
              {maxIndex === 0 && (
                <div className="carousel-inner">
                  <div
                    key={
                      "carouselItem" +
                      items[0][carousel[0].properties[0].itemKey]
                    }
                    className={
                      items[0][carousel[0].properties[0].itemKey] ===
                      itemSelected[carousel[0].properties[0].itemKey]
                        ? "carousel-item active"
                        : "carousel-item"
                    }
                  >
                    <h6 className="carousel-header text-center">
                      {" "}
                      {items[0][carousel[0].properties[0].itemTitle]}
                    </h6>
                    <img
                      key={
                        "carouselItemImg" +
                        items[0][carousel[0].properties[0].itemKey]
                      }
                      src={items[0][carousel[0].properties[0].itemImage]}
                      className="d-block w-100"
                      alt="..."
                    />
                    <h6 className="carousel-footer text-center mt-4">
                      {items[0][carousel[0].properties[0].itemSubtitle]}
                    </h6>
                  </div>
                </div>
              )}
              {/* multiple items in the carousel */}
              {maxIndex > 0 && (
                <div className="carousel-inner">
                  <div className="carousel-indicators li">
                    {items.map((item, index) => (
                      <button
                        key={
                          "carouselIndicator" +
                          item[carousel[0].properties[0].itemKey]
                        }
                        type="button"
                        data-bs-target="#carouselWithCaptions"
                        data-bs-slide-to={index}
                        className={
                          item[carousel[0].properties[0].itemKey] ===
                          itemSelected[carousel[0].properties[0].itemKey]
                            ? "active"
                            : ""
                        }
                        aria-current={
                          item[carousel[0].properties[0].itemKey] ===
                          itemSelected[carousel[0].properties[0].itemKey]
                            ? "true"
                            : "false"
                        }
                        aria-label={
                          "Slide" + item[carousel[0].properties[0].itemKey]
                        }
                      ></button>
                    ))}
                  </div>

                  {items.map((item, index) => (
                    <div
                      key={
                        "carouselItem" + item[carousel[0].properties[0].itemKey]
                      }
                      className={
                        item[carousel[0].properties[0].itemKey] ===
                        itemSelected[carousel[0].properties[0].itemKey]
                          ? "carousel-item active"
                          : "carousel-item"
                      }
                    >
                      <h3 className="carousel-header text-center">
                        {item[carousel[0].properties[0].itemTitle]}{" "}
                        {item[carousel[0].properties[0].itemSubtitle]}
                      </h3>
                      <div
                        key={
                          "carouselItemCaption" +
                          item[carousel[0].properties[0].itemKey]
                        }
                        className="carousel-caption d-none d-md-block"
                      ></div>
                      <img
                        key={
                          "carouselItemImg" +
                          item[carousel[0].properties[0].itemKey]
                        }
                        src={item[carousel[0].properties[0].itemImage]}
                        className="d-block w-100"
                        alt="..."
                      />
                      <h4 className="carousel-footer text-center mt-4">
                        {item[carousel[0].properties[0].itemSubtitle]}
                      </h4>

                      <button
                        key={
                          "carouselItemPrev" +
                          item[carousel[0].properties[0].itemKey]
                        }
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselWithCaptions"
                        data-bs-slide="prev"
                        onClick={() =>
                          onItemChanged(
                            items[index === 0 ? maxIndex : index - 1]
                          )
                        }
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>

                      <button
                        key={
                          "carouselItemNext" +
                          item[carousel[0].properties[0].itemKey]
                        }
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselWithCaptions"
                        data-bs-slide="next"
                        onClick={() =>
                          onItemChanged(
                            items[index === maxIndex ? 0 : index + 1]
                          )
                        }
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarCarousel;
