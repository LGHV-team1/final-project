import Button from "./Button";

function Modal({ showModal, setShowModal }) {
  if (!showModal) {
    console.log("modal");
    return null;
  }

  return (
    <section className="absolute z-30 left-25 ">
      <iframe
        width="1000"
        height="500"
        src="https://www.youtube.com/embed/RU0MOmQVut8?si=yJm3LnUDay_kDUMJ&autoplay=1"
        title="YouTube video player"
      
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <Button onClick={() => setShowModal(false)} label={"X"} />

      <div className="fixed bottom-4 right-4 flex gap-3 text-white">
        {/* iframe 등 기타 내용 */}
      </div>
    </section>
  );
}

export default Modal;
