document.addEventListener("DOMContentLoaded", () => {
  const audioFileInput = document.getElementById("audioFile");
  const audioPlayer = document.getElementById("audio");
  const canvas = document.getElementById("visualizer");
  const ctx = canvas.getContext("2d");

  const exampleBtn = document.getElementById("exampleBtn");

  exampleBtn.addEventListener("click", () => {
    audioPlayer.src = "flipaswitch_raye.mp3";

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audioPlayer);
    const analyserNode = audioContext.createAnalyser();
    source.connect(analyserNode);
    analyserNode.connect(audioContext.destination);

    analyserNode.fftSize = 64;
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function getColor(index) {
      const colors = ["#FFCCCB"];
      return colors[index % colors.length];
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      analyserNode.getByteFrequencyData(dataArray);

      const width = canvas.width / bufferLength;
      dataArray.forEach((amplitude, index) => {
        const height = ((amplitude / 255) * canvas.height) / 2;
        const x = width * index;
        const y = (canvas.height - height) / 2;

        ctx.fillStyle = getColor(index);
        ctx.fillRect(x, y, width * 0.8, height);
      });

      requestAnimationFrame(draw);
    }

    draw();
  });

  audioFileInput.addEventListener("change", (e) => {
    const audioURL = URL.createObjectURL(e.target.files[0]);
    audioPlayer.src = audioURL;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audioPlayer);
    const analyserNode = audioContext.createAnalyser();
    source.connect(analyserNode);
    analyserNode.connect(audioContext.destination);

    analyserNode.fftSize = 64;
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function getColor(index) {
      const colors = ["#FF0000"];
      return colors[index % colors.length];
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      analyserNode.getByteFrequencyData(dataArray);

      const width = canvas.width / bufferLength;
      dataArray.forEach((amplitude, index) => {
        const height = ((amplitude / 255) * canvas.height) / 2;
        const x = width * index;
        const y = (canvas.height - height) / 2;

        ctx.fillStyle = getColor(index);
        ctx.fillRect(x, y, width * 0.8, height);
      });

      requestAnimationFrame(draw);
    }

    draw();
  });
});