import React from "react"
import Modal from "react-bootstrap/Modal";

const ImgLightbox = props => {
  const { imgUrl, setModalShow } = props;
  return (
    <Modal
      {...props}
      // size="xl"
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {imgUrl ? (
        <div>
          <img
            src={imgUrl}
            style={{ height: "100%", width: "100%" }}
            // onClick={() => setModalShow(true)}
          />
        </div>
      ) : (
        <>Loading...</>
      )}
    </Modal>
  );
};

export default ImgLightbox;