function Objectives(objectiveList) {
	const ol = document.createElement('ol');
	ol.setAttribute('id', 'objectives');
	objectiveList.forEach((objective, i) => {
		const li = document.createElement('li');
		li.innerHTML = '<span class="list-number">' + (i + 1) + '</span>';
		li.innerHTML += '<span class="objective-list-item">'+ objective + '</span>';
		ol.appendChild(li);
	});

	const contentDiv = document.querySelector('.content');
	contentDiv.insertBefore(ol, contentDiv.firstChild);


	window.addEventListener("message", receiveMessage, false);

	function receiveMessage(event) {
			console.log(event.data);
			const lis = document.querySelectorAll('#objectives > li');
			lis.forEach((li, i) => {
				if (event.data[i]) {
					li.classList.add('passed');
				} else {
					li.classList.remove('passed');
				}
			});
	}
}
