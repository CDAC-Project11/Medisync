import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/patient/health-section.css";

function HealthSection() {

  // TEMP STATIC DATA (Replace later with API)
  const patient = {
    name: "Jay",
    heightCm: 170,
    weightKg: 68,
    age: 28,
    gender: "MALE"
  };

  const [bmi, setBmi] = useState(0);
  const [bmiText, setBmiText] = useState("");
  const [angle, setAngle] = useState(0);

  const [diet, setDiet] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });

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

    // BMI CATEGORY
    let category = "";
    if (bmiValue < 18.5) category = "Underweight";
    else if (bmiValue < 25) category = "Normal";
    else if (bmiValue < 30) category = "Overweight";
    else category = "Obese";

    setBmiText(category);

    // -------- FIXED NEEDLE ANGLE --------
    const minBMI = 16;
    const maxBMI = 40;

    const clampedBMI = Math.max(minBMI, Math.min(bmiValue, maxBMI));

    // Map BMI to gauge angle
    // Gauge goes from -90° (left, BMI 16) to +90° (right, BMI 40)
    // Since the needle line points left (at 180° in SVG), we subtract 180° to get the correct rotation
    const mappedAngle = ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 180 - 180 - 180;

    setAngle(mappedAngle);

    // -------- DIET CALCULATION --------
    calculateDiet(bmiValue);
  };

  const calculateDiet = (bmiValue) => {
    let baseCalories = patient.weightKg * 30;

    if (bmiValue < 18.5) baseCalories += 400;
    else if (bmiValue > 25) baseCalories -= 300;

    const protein = Math.round(patient.weightKg * 1.5);
    const fats = Math.round((baseCalories * 0.25) / 9);
    const carbs = Math.round((baseCalories * 0.5) / 4);

    setDiet({
      calories: baseCalories,
      protein,
      carbs,
      fats
    });
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

          {/* ================= BMI GAUGE ================= */}
          <div className="gauge-container">
            <svg viewBox="0 0 300 163" className="gauge-svg">

              <g transform="translate(18,18)">

                {/* COLOR ARCS */}
                <path d="M0 140 A140 140, 0, 0, 1, 6.9 96.7 L140 140 Z" fill="#fee2e2" />
                <path d="M6.9 96.7 A140 140, 0, 0, 1, 12.1 83.1 L140 140 Z" fill="#fecaca" />
                <path d="M12.1 83.1 A140 140, 0, 0, 1, 22.6 63.8 L140 140 Z" fill="#fed7aa" />
                <path d="M22.6 63.8 A140 140, 0, 0, 1, 96.7 6.9 L140 140 Z" fill="#bbf7d0" />
                <path d="M96.7 6.9 A140 140, 0, 0, 1, 169.1 3.1 L140 140 Z" fill="#fef08a" />
                <path d="M169.1 3.1 A140 140, 0, 0, 1, 233.7 36 L140 140 Z" fill="#fed7aa" />
                <path d="M233.7 36 A140 140, 0, 0, 1, 273.1 96.7 L140 140 Z" fill="#fca5a5" />
                <path d="M273.1 96.7 A140 140, 0, 0, 1, 280 140 L140 140 Z" fill="#f87171" />

                {/* NUMBER MARKERS */}
                <g style={{ fontSize: "12px", fill: "#1e293b", fontWeight: 700 }}>
                  <text x="18" y="115" transform="rotate(-72 18 115)">16</text>
                  <text x="22" y="98" transform="rotate(-66 22 98)">17</text>
                  <text x="26" y="85" transform="rotate(-57 26 85)">18.5</text>
                  <text x="88" y="32" transform="rotate(-18 88 32)">25</text>
                  <text x="148" y="23" transform="rotate(12 148 23)">30</text>
                  <text x="205" y="48" transform="rotate(42 205 48)">35</text>
                  <text x="243" y="100" transform="rotate(72 243 100)">40</text>
                </g>

                {/* WHITE CENTER MASK */}
                <path d="M45 140 A90 90, 0, 0, 1, 230 140 Z" fill="#fff" />

                {/* CENTER DOT */}
                <circle cx="140" cy="140" r="6" fill="#084298" />

                {/* ===== NEEDLE ===== */}
                <g transform={`rotate(${angle} 140 140)`} style={{ transition: "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)" }}>
                  <line
                    x1="140"
                    y1="140"
                    x2="55"
                    y2="140"
                    stroke="#084298"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>

                <circle cx="140" cy="140" r="9" fill="#084298" />

                {/* BMI TEXT */}
                <text x="70" y="120" style={{ fontSize: "26px", fontWeight: "bold" }}>
                  BMI = {bmi}
                </text>

              </g>
            </svg>
          </div>

          {/* BMI RESULT */}
          <div className="bmi-result">
            <h4>{bmiText}</h4>
            <p>Your BMI Score: <b>{bmi}</b></p>
          </div>

          {/* ================= DIET RECOMMENDATION ================= */}
          <div className="diet-box">
            <h5 className="fw-bold">Recommended Daily Intake</h5>
            <ul className="mb-0">
              <li>Calories: <b>{diet.calories} kcal</b></li>
              <li>Protein: <b>{diet.protein} g</b></li>
              <li>Carbs: <b>{diet.carbs} g</b></li>
              <li>Fats: <b>{diet.fats} g</b></li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}

export default HealthSection;