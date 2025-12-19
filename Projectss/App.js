import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  // ---------- STATE MANAGEMENT ----------
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const studentsRef = collection(db, "students");

  // ---------- REAL-TIME READ ----------
  useEffect(() => {
    const unsubscribe = onSnapshot(
      studentsRef,
      (snapshot) => {
        setStudents(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
        );
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ---------- CREATE ----------
  const addStudent = async () => {
    try {
      await addDoc(studentsRef, {
        name: "Renz Tyron , Kenart Aquino, Jayvy Magdaraog, Jefferson Panti, Lowell Gianan",
        email: "OurGroup@gmail.com",
        age: 20
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------- UPDATE (+1 AGE) ----------
  const updateStudent = async (id, currentAge) => {
    try {
      const studentDoc = doc(db, "students", id);
      await updateDoc(studentDoc, {
        age: currentAge + 1
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------- DELETE ----------
  const deleteStudent = async (id) => {
    try {
      const studentDoc = doc(db, "students", id);
      await deleteDoc(studentDoc);
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------- UI STATES ----------
  if (loading) return <p style={styles.center}>Loading students...</p>;
  if (error) return <p style={styles.error}>Error: {error}</p>;

  // ---------- UI ----------
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>📚 Student Management</h1>
        <p style={styles.subtitle}>
          Firebase + Firestore CRUD with React State Management
        </p>

        <button style={styles.addButton} onClick={addStudent}>
          ➕ Add Student
        </button>

        <ul style={styles.list}>
          {students.map((student) => (
            <li key={student.id} style={styles.listItem}>
              <div>
                <strong>{student.name}</strong>
                <br />
                <span>{student.email}</span>
                <br />
                <span>Age: {student.age}</span>
              </div>

              <div style={styles.actions}>
                <button
                  style={styles.updateButton}
                  onClick={() =>
                    updateStudent(student.id, student.age)
                  }
                >
                  +1 Age
                </button>

                <button
                  style={styles.deleteButton}
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---------- STYLES ----------
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },
  title: {
    textAlign: "center",
    marginBottom: "5px"
  },
  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px"
  },
  addButton: {
    width: "100%",
    padding: "10px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "15px",
    fontSize: "16px"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f4f6ff",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  actions: {
    display: "flex",
    gap: "6px"
  },
  updateButton: {
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  deleteButton: {
    background: "#f44336",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  center: {
    textAlign: "center",
    color: "#fff"
  },
  error: {
    color: "red",
    textAlign: "center"
  }
};

export default App;
