import Button from "./Button";

function Modal({ showModal, setShowModal }) {
  if (!showModal) {
    return null;
  }

  return (
    <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-30 bg-black bg-opacity-50">
      <div className="fixed top-0 right-4">
        <Button onClick={() => setShowModal(false)} label={"X"} />
      </div>
      <iframe
        width="1600"
        height="800"
        src="https://www.youtube.com/embed/RU0MOmQVut8?si=yJm3LnUDay_kDUMJ&autoplay=1"
        title="YouTube video player"
      
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      

      <div className="fixed bottom-4 right-4 flex gap-3 text-white">
        {/* iframe 등 기타 내용 */}
      </div>
    </section>
  );
}

export default Modal;
