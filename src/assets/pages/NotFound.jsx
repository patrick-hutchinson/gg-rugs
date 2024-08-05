import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="pageContainer">
      <div>
        Oops, we lost the thread. Find it by going <Link to="/">Home</Link>.
      </div>
    </main>
  );
}
