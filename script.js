const boxElement = document.querySelector('.box');
    const actionButtonElement = document.getElementById("actionButton");
    const chronoElement = document.getElementById('chrono');

    let seconds = 0;
    let timer;
    let isWorking = false;

    function startChronometer() {
      if (isWorking) return;
      stopChronometer();
      isWorking = true;
      boxElement.style.backgroundColor = "blueviolet";
      boxElement.style.width = "1%";
      boxElement.style.height = "50%";
      timer = setInterval(() => {
	seconds++;
	chronoElement.textContent = formatTime(seconds);

	if (seconds <= 240) {

	  boxElement.classList.add('heading-animation');
	  boxElement.style.backgroundColor = "lawngreen";
	  boxElement.style.width = "25%";
	  boxElement.style.height = "25%";
	}
	if (seconds >= 300) {
	  boxElement.classList.remove('heading-animation');
	  boxElement.style.backgroundColor = "red";
	  boxElement.style.width = "10%";
	  boxElement.style.height = "10%";
	  clearInterval(timer);
	  isWorking = false;
	  actionButtonElement.textContent = "Start Countdown";
	}

      }, 1000);
    }
 actionButtonElement.addEventListener("click", startChronometer);
    function stopChronometer() {
      clearInterval(timer);
      isWorking = false;
    }

    function resetChronometer() {
      seconds = 0;
      chronoElement.textContent = formatTime(seconds);
      boxElement.style.backgroundColor = "red";
      boxElement.style.width = "50%";
      boxElement.style.height = "50%";
    }

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    actionButtonElement.addEventListener('click', function() {
      if (actionButtonElement.textContent === 'Start Countdown') {
	startChronometer();
	actionButtonElement.textContent = 'Stop Countdown';
      } else {
	stopChronometer();
	actionButtonElement.textContent = 'Start Countdown';
	resetChronometer();
      }
    });

    window.addEventListener('offline', function() {
      stopChronometer();
      actionButtonElement.disabled = true;
    });

    window.addEventListener('online', function() {
      actionButtonElement.disabled = false;
    });

    // Initial setup
    chronoElement.textContent = formatTime(seconds);