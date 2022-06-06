import React from "react";

const Contact = () => {
  return (
    <>
      <section className="contact__container">
        <div className="contact-box">
          <div className="contact-links">
            <h2>CONTACT</h2>
            <div className="links">
              <div className="link">
                <a
                  href="https://www.linkedin.com/in/kim-scheerens-7384b398/"
                  target="_blank"
                >
                  <img
                    src="https://i.postimg.cc/m2mg2Hjm/linkedin.png"
                    alt="linkedin"
                  />
                </a>
              </div>
              <div className="link">
                <a
                  href="https://github.com/kimscheerens?tab=repositories"
                  target="_blank"
                >
                  <img
                    src="https://i.postimg.cc/YCV2QBJg/github.png"
                    alt="github"
                  />
                </a>
              </div>
              <div className="link">
                <a href="mailto:kimscheerens@hotmail.com" target="_blank">
                  <img
                    src="https://i.postimg.cc/NjLfyjPB/email.png"
                    alt="email"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="contact-form-wrapper">
            {/* <form>
              <div className="form-item">
                <label className="form-item__label">Name:</label>
                <input
                  className="form-item__input"
                  type="text"
                  name="sender"
                  required
                />
              </div>
              <div className="form-item">
                <label className="form-item__label">Email:</label>
                <input
                  className="form-item__input"
                  type="text"
                  name="email"
                  required
                />
              </div>
              <div className="form-item">
                <label className="form-item__label">Message:</label>
                <textarea
                  className="form-item__input"
                  name="message"
                  required
                ></textarea>
              </div>
              <button className="submit-btn">Send</button>
            </form> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
