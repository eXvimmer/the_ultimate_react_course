const hour = new Date().getHours();
const openHour = 12;
const closeHour = 22;
const isOpen = hour >= openHour && hour <= closeHour;

function Footer() {
  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>
            We're open from {openHour}:00 to {closeHour}:00. Come visit us or
            order online.
          </p>
          <button className="btn">Order</button>
        </div>
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
}

export default Footer;
