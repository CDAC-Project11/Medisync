import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/patient/health-section.css";

function HealthSection() {
  // Temporary static data (later from API)
  const patient = {
    name: "John Doe",
    heightCm: 170,
    weightKg: 68
  };

  const [bmi, setBmi] = useState(0);
  const [bmiText, setBmiText] = useState("");
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    calculateBMI();
  }, []);

  const calculateBMI = () => {
    const bmiValue = Number(
  (
    patient.weightKg /
    Math.pow(patient.heightCm / 100, 2)
  ).toFixed(1)
);


    setBmi(bmiValue);

    let text = "";
    let deg = 0;

    if (bmiValue <= 16) {
      text = "Severely Underweight";
      deg = -90;
    } else if (bmiValue <= 17) {
      text = "Severely Underweight";
      deg = -90 + ((bmiValue - 16) / 1) * 18;
    } else if (bmiValue <= 18.5) {
      text = "Underweight";
      deg = -72 + ((bmiValue - 17) / 1.5) * 15;
    } else if (bmiValue <= 25) {
      text = "Normal";
      deg = -57 + ((bmiValue - 18.5) / 6.5) * 39;
    } else if (bmiValue <= 30) {
      text = "Overweight";
      deg = -18 + ((bmiValue - 25) / 5) * 30;
    } else if (bmiValue <= 35) {
      text = "Obesity Class I";
      deg = 12 + ((bmiValue - 30) / 5) * 30;
    } else if (bmiValue <= 40) {
      text = "Obesity Class II";
      deg = 42 + ((bmiValue - 35) / 5) * 30;
    } else {
      text = "Obesity Class III";
      deg = 90;
    }

    setBmiText(text);
    setAngle(deg);
  };

  return (
    <>
      <Navbar />

      <div className="page-content">
        <div className="health-card">

          <h3 className="fw-bold text-center mb-3">Health Overview</h3>

          <p><b>Patient Name:</b> {patient.name}</p>
          <p><b>Height:</b> {patient.heightCm} cm</p>
          <p><b>Weight:</b> {patient.weightKg} kg</p>

          {/* BMI GAUGE */}
<div className="gauge-container">
  <svg
    viewBox="0 0 300 163"
    className="gauge-svg"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(18,18)">
        {/* ===== TEXT PATH DEFINITIONS ===== */}
<defs>
  <path
    id="curveUnder"
    d="M-4 140 A140 140, 0, 0, 1, 284 140"
    fill="none"
  />
  <path
    id="curveNormal"
    d="M33 43.6 A140 140, 0, 0, 1, 280 140"
    fill="none"
  />
  <path
    id="curveOver"
    d="M95 3 A140 140, 0, 0, 1, 284 140"
    fill="none"
  />
  <path
    id="curveObese"
    d="M235.4 33 A140 140, 0, 0, 1, 284 140"
    fill="none"
  />
  

</defs>
{/* ===== COLORED ARCS (same as EJS) ===== */}
      <path d="M0 140 A140 140, 0, 0, 1, 6.9 96.7 L140 140 Z" fill="#fee2e2" />
      <path d="M6.9 96.7 A140 140, 0, 0, 1, 12.1 83.1 L140 140 Z" fill="#fecaca" />
      <path d="M12.1 83.1 A140 140, 0, 0, 1, 22.6 63.8 L140 140 Z" fill="#fed7aa" />
      <path d="M22.6 63.8 A140 140, 0, 0, 1, 96.7 6.9 L140 140 Z" fill="#bbf7d0" />
      <path d="M96.7 6.9 A140 140, 0, 0, 1, 169.1 3.1 L140 140 Z" fill="#fef08a" />
      <path d="M169.1 3.1 A140 140, 0, 0, 1, 233.7 36 L140 140 Z" fill="#fed7aa" />
      <path d="M233.7 36 A140 140, 0, 0, 1, 273.1 96.7 L140 140 Z" fill="#fca5a5" />
      <path d="M273.1 96.7 A140 140, 0, 0, 1, 280 140 L140 140 Z" fill="#f87171" />

{/* ===== NUMERIC MARKINGS ===== */}
<g style={{ fontSize: "12px", fill: "#1e293b", fontWeight: 700 }}>
  <text x="18" y="115" transform="rotate(-72 18 115)">16</text>
  <text x="22" y="98" transform="rotate(-66 22 98)">17</text>
  <text x="26" y="85" transform="rotate(-57 26 85)">18.5</text>
  <text x="88" y="32" transform="rotate(-18 88 32)">25</text>
  <text x="148" y="23" transform="rotate(12 148 23)">30</text>
  <text x="205" y="48" transform="rotate(42 205 48)">35</text>
  <text x="243" y="100" transform="rotate(72 243 100)">40</text>
</g>
{/* ===== BMI RANGE LABELS ===== */}
<g style={{ fontSize: "13px", fill: "#334155", fontWeight: 600 }}>
  <text>
    <textPath xlinkHref="#curveUnder" startOffset="5%">
      Underweight
    </textPath>
  </text>

  <text>
    <textPath xlinkHref="#curveNormal" startOffset="5%">
      Normal
    </textPath>
  </text>

  <text>
    <textPath xlinkHref="#curveOver" startOffset="5%">
      Overweight
    </textPath>
  </text>

  <text>
    <textPath xlinkHref="#curveObese" startOffset="5%">
      Obesity
    </textPath>
  </text>
</g>



      

      {/* White center mask */}
      <path d="M45 140 A90 90, 0, 0, 1, 230 140 Z" fill="#fff" />

      {/* Center dot */}
      <circle cx="140" cy="140" r="6" fill="#084298" />

      {/* ===== NEEDLE ===== */}
      <line
        x1="140"
        y1="140"
        x2="55"
        y2="140"
        stroke="#084298"
        strokeWidth="4"
        strokeLinecap="round"
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: "140px 140px",
          transition: "transform 1s ease-out"
        }}
      />

      {/* Needle hub */}
      <circle cx="140" cy="140" r="9" fill="#084298" />

      {/* BMI TEXT */}
      <text
        x="70"
        y="120"
        style={{ fontSize: "26px", fontWeight: "bold", fill: "#000" }}
      >
        BMI = {bmi}
      </text>

    </g>
  </svg>
</div>


          <div className="bmi-result">
            <h4>BMI: {bmi}</h4>
            <p>{bmiText}</p>
          </div>

          {/* DIET */}
          <div className="diet-box">
            <h5 className="fw-bold">Recommended Daily Intake</h5>
            <ul className="mb-0">
              <li>Calories: <b>2200 kcal</b></li>
              <li>Protein: <b>90 g</b></li>
              <li>Carbs: <b>275 g</b></li>
              <li>Fats: <b>70 g</b></li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}

export default HealthSection;
