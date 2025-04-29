export const Contact = () => {

    const handleFormSubmit = (formData) => {
        console.log(formData.entries())
        const formInputData = Object.fromEntries(formData.entries());
    }

  return (
    <section className="section-contact">
      <h2 className="container-title">Contac us</h2>

      <div className="contact-wrapper container">
        <form action={handleFormSubmit}>
          <input
            type="text"
            required
            autoComplete="off"
            placeholder="Enter your name"
            name="username"
            className="form-control"
          />

          <input
            type="email"
            required
            autoComplete="off"
            placeholder="Enter your mail"
            name="email"
            className="form-control"
          />

          <textarea
            rows="8"
            required
            autoComplete="off"
            placeholder="Enter your Message"
            name="message"
            className="form-control"
          ></textarea>

          <button type="submit" value="send">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};
