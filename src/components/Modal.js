function Modal({ showModal,setShowModal }) {
  if (!showModal) {
    console.log("modal");
    return null;
  }

  return (
    <section className="top-1/6 absolute right-1/2 z-50 translate-x-1/2 translate-y-1/2">
      
      <iframe width="560" height="315" src="https://www.youtube.com/embed/RU0MOmQVut8?si=yJm3LnUDay_kDUMJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <button
          onClick={() => setShowModal(false)}
          className="rounded bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
        >
          뒤로 가기
        </button>
        <div className="fixed bottom-4 right-4 flex gap-3 text-white">
          {/* iframe 등 기타 내용 */}
        </div>
      
    </section>
  );
}

export default Modal;
