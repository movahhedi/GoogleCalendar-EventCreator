import $ from "jquery/dist/jquery.slim";

const People = [
	["SHM", "شهاب"],
	["MHD", "محمدحسین دیبائی"],
	["MSM", "محمد شکوری"],
	["MHP", "محمدحسین پروینی"],
	["ABA", "احمد"],
];

let Q_text, Who, CourseName, Q_details, result, Weekday, StartTime, EndTime, StartDate, Q_dates,
	Q_crm = "BUSY",
	Q_trp = "true",
	recur = "RRULE:FREQ=WEEKLY;UNTIL=20240112;BYDAY=",
	LinkPrefix = "https://calendar.google.com/calendar/u/0/r/eventedit",
	Weekday_Int2Word = {
		0: "SA",
		1: "SU",
		2: "MO",
		3: "TU",
		4: "WE",
		5: "TH",
		6: "FR",
	};

function CreateLink() {
	Who = ((document.getElementById("Who") as HTMLInputElement).value as string).trim();
	Q_details = ((document.getElementById("Details") as HTMLInputElement).value as string).trim();
	CourseName = ((document.getElementById("CourseName") as HTMLInputElement).value as string).trim();
	Weekday = parseInt((document.getElementById("Weekday") as HTMLInputElement).value as string);
	StartDate = `202309${23 + Weekday}`,
	StartTime = ((document.getElementById("StartTime") as HTMLInputElement).value as string).trim().replace(":", "").padEnd(4, "0");
	EndTime = ((document.getElementById("EndTime") as HTMLInputElement).value as string).trim().replace(":", "").padEnd(4, "0");
	Q_dates = `${StartDate}T${StartTime}00/${StartDate}T${EndTime}00`;
	Q_text = `${Who}: ${CourseName}`
	Q_text = `${Who}: ${CourseName}`

	result = `${LinkPrefix}?text=${Q_text}&dates=${Q_dates}&details=${Q_details}&crm=${Q_crm}&trp=${Q_trp}&recur=${recur + Weekday_Int2Word[Weekday]}`;

	(document.getElementById("Link") as HTMLAnchorElement).href = result;
	console.log(result);
}

const InitialBody = <div>
	<fieldset>
		<legend>Event</legend>
		<div>
			<label htmlFor="Who">Who</label>
			<select id="Who" onInput={CreateLink}>
				<option value=""></option>
				{People.map((i) => (
					<option value={i[0]}>{i[1]}</option>
				))}
			</select>
		</div>
		<div>
			<label htmlFor="CourseName">Course Name</label>
			<input type="text" id="CourseName" onInput={CreateLink} />
		</div>
		<div>
			<label htmlFor="Weekday">Weekday</label>
			<select id="Weekday" onInput={CreateLink}>
				<option value="0">شنبه</option>
				<option value="1">یکشنبه</option>
				<option value="2">دوشنبه</option>
				<option value="3">سه‌شنبه</option>
				<option value="4">چهارشنبه</option>
				<option value="5">پنجشنبه</option>
				<option value="6">جمعه</option>
			</select>
		</div>
		<div>
			<label htmlFor="StartTime">Start Time</label>
			<input type="text" id="StartTime" value="1300" maxLength={4} onInput={CreateLink} />
		</div>
		<div>
			<label htmlFor="EndTime">End Time</label>
			<input type="text" id="EndTime" value="1545" maxLength={4} onInput={CreateLink} />
		</div>
		<div>
			<label htmlFor="Details">Details</label>
			<input type="text" id="Details" onInput={CreateLink} />
		</div>
	</fieldset>
	<button type="button">
		<a href="#" id="Link" target="_blank">Add to Calendar</a>
	</button>

</div>;

document.body.appendChild(InitialBody);
