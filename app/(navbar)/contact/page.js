import {
  FaWhatsapp,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const Contact = () => {
  return (
    <>
    <main className="pt-10">
    <div className="absolute inset-0 -z-10 bg-gray-300"></div>
    <section className="max-w-4xl mx-auto px-6 py-24 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Get in Touch
      </h1>

      <p className="text-gray-600 mb-12">
        Connect with me on the platforms below.
      </p>

      <div className="flex justify-center gap-10 text-3xl">
        {/* WhatsApp */}
        <a
          href="https://wa.me/918918716256" target="blank"
          aria-label="WhatsApp"
          className="text-green-500 hover:scale-110 transition"
        >
          <FaWhatsapp />
        </a>

        {/* Instagram */}
        <a
         href="https://www.instagram.com/sohailkhan_n19?igsh=emVmaGx2dzhzaW1z "
              target="_blank"
          aria-label="Instagram"
          className="text-pink-500 hover:text-purple-500 hover:scale-110 transition"
        >
          <FaInstagram />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Developer-Sohail786" target="_blank"
          aria-label="GitHub"
          className="text-gray-900 hover:scale-110 transition"
        >
          <FaGithub />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/sohail-khan-8a5b36371/"
              target="_blank"
          aria-label="LinkedIn"
          className="text-blue-600 hover:scale-110 transition"
        >
          <FaLinkedin />
        </a>
      </div>
    </section>
    </main>
    </>
  );
};

export default Contact;
