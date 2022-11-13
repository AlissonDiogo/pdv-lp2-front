<script>
    import Quagga from "quagga";
    let scannerRef;
    let a, o, g;
    let bar;

    const scan = () => {
        Quagga.init({
        inputStream : {
            name : "Live",
            type : "LiveStream",
            target: scannerRef
        },
        decoder : {
            readers : ["ean_reader"]
        }
        }, function(err) {
            if (err) {
                console.log(err);
                return;
            }

            Quagga.start();
        });
    };

    Quagga.onDetected((data) => {
        bar = data;
        console.log(data)
        beep();
        Quagga.stop();
    });

    const setupAudio = () => {
		let AudioContext = window.AudioContext;
		a = new AudioContext();
	}

    const beep = () => {
		o = a.createOscillator();
		g = a.createGain();
		o.connect(g);
		o.type = "square";
		o.frequency.value = 620;
		g.connect(a.destination);
		o.start(a.currentTime);
		o.stop(a.currentTime + 0.1);
	};

    const init = () => {
        setupAudio();
        scan();
    }
</script>

<main>
    <section id="camera" bind:this={scannerRef} />
    <section>{bar? bar.codeResult.code : ""}</section>
    <button on:click={init}>Scan</button>
</main>

<style>
    #camera {
        display: none;
    }
</style>