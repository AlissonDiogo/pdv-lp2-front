<script>
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let now = new Date();
  
    const halfSecondMs = 30000;
    setInterval(() => {
      now = new Date();
    }, halfSecondMs);
  
  </script>
  
  <main>
    <h1>FREE CASHIER</h1>
    <section>
      <h2>{now.getHours()}:{now.getMinutes()}</h2>
      <p>{now.getDay()} {months[now.getMonth()].toUpperCase()} {now.getFullYear()}</p>
    </section>
  </main>