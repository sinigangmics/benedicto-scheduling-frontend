import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { SharedService } from 'src/app/shared.service';
import { Teachers } from '@app/_models/teachers';
import { first } from 'rxjs';
import * as $ from 'jquery';

import { AlertService } from '@app/_services';
import { TeacherService } from '@app/_services/teacher.service';

@Component({
  templateUrl: 'allSched.component.html',
})
export class allSchedComponent implements AfterViewInit {
  @ViewChild('schedulerReference5') scheduler5!: jqxSchedulerComponent;
  teachers: Teachers[] = [];

  constructor(
    private sharedService: SharedService,
    private alertService: AlertService,
    private teacherService: TeacherService
  ) {}

  ngAfterViewInit(): void {
    this.generateAppointments();

    this.teacherService
      .getAll()
      .pipe(first())
      .subscribe((teachers) => (this.teachers = teachers));

    //^ ADD ALERT
    if (localStorage.getItem('scheduleAdded') === 'true') {
      // Display the success alert
      this.alertService.success('Added schedule successful', {
        keepAfterRouteChange: true,
      });

      // Remove the flag from localStorage to prevent repeated alerts
      localStorage.removeItem('scheduleAdded');
    }

    //^ UPDATED ALERT
    if (localStorage.getItem('scheduleUpdated') === 'true') {
      // Display the success alert
      this.alertService.success('Updated schedule successful', {
        keepAfterRouteChange: true,
      });

      // Remove the flag from localStorage to prevent repeated alerts
      localStorage.removeItem('scheduleUpdated');
    }

    //^ DELETE ALERT
    if (localStorage.getItem('scheduleDeleted') === 'true') {
      // Display the success alert
      this.alertService.success('Delete schedule successful', {
        keepAfterRouteChange: true,
      });

      // Remove the flag from localStorage to prevent repeated alerts
      localStorage.removeItem('scheduleDeleted');
    }
  }

  generateAppointments(): void {
    // Fetch schedules for the first set
    this.sharedService.getSchedules().subscribe({
      next: (data) => {
        const appointments = data.map((event) => ({
          id: event.id.toString(),
          subject_code: event.subject_code,
          subject: event.subject,
          units: event.units,
          teacher: event.teacher,
          room: event.room,
          start: new Date(event.start),
          end: new Date(event.end),
          day: event.dayName,
          draggable: false,
          resizable: false,
          readOnly: true,
          recurrencePattern: event.recurrencePattern,
          background: event.background,
        }));

        this.source.localdata = appointments;
        this.dataAdapter = new jqx.dataAdapter(this.source);
        if (this.scheduler5) {
          this.scheduler5.source(this.dataAdapter); // Refresh the scheduler to apply the data
        }
      },
      error: (error) => {
        console.error('Error loading schedules:', error);
      },
    });

    // Fetch schedules for the second set
    this.sharedService.getSecondSchedules().subscribe({
      next: (data) => {
        const appointments = data.map((event) => ({
          id: event.id.toString(),
          subject_code: event.subject_code,
          subject: event.subject,
          units: event.units,
          teacher: event.teacher,
          room: event.room,
          start: new Date(event.start),
          end: new Date(event.end),
          day: event.dayName,
          draggable: false,
          resizable: false,
          readOnly: true,
          recurrencePattern: event.recurrencePattern,
          background: event.background,
        }));

        // Merge or replace localdata as needed, e.g., by concatenating
        this.source.localdata = [...this.source.localdata, ...appointments];
        this.dataAdapter = new jqx.dataAdapter(this.source);
        if (this.scheduler5) {
          this.scheduler5.source(this.dataAdapter);
        }
      },
      error: (error) => {
        console.error('Error loading second schedules:', error);
      },
    });
    this.sharedService.getThirdSchedules().subscribe({
      next: (data) => {
        const appointments = data.map((event) => ({
          id: event.id.toString(),
          subject_code: event.subject_code,
          subject: event.subject,
          units: event.units,
          teacher: event.teacher,
          room: event.room,
          start: new Date(event.start),
          end: new Date(event.end),
          day: event.dayName,
          draggable: false,
          resizable: false,
          readOnly: true,
          recurrencePattern: event.recurrencePattern,
          background: event.background,
        }));

        // Merge or replace localdata as needed, e.g., by concatenating
        this.source.localdata = [...this.source.localdata, ...appointments];
        this.dataAdapter = new jqx.dataAdapter(this.source);
        if (this.scheduler5) {
          this.scheduler5.source(this.dataAdapter);
        }
      },
      error: (error) => {
        console.error('Error loading third schedules:', error);
      },
    });

    this.sharedService.getFourthSchedules().subscribe({
      next: (data) => {
        const appointments = data.map((event) => ({
          id: event.id.toString(),
          subject_code: event.subject_code,
          subject: event.subject,
          units: event.units,
          teacher: event.teacher,
          room: event.room,
          start: new Date(event.start),
          end: new Date(event.end),
          day: event.dayName,
          draggable: false,
          resizable: false,
          readOnly: true,
          recurrencePattern: event.recurrencePattern,
          background: event.background,
        }));

        // Merge or replace localdata as needed, e.g., by concatenating
        this.source.localdata = [...this.source.localdata, ...appointments];
        this.dataAdapter = new jqx.dataAdapter(this.source);
        if (this.scheduler5) {
          this.scheduler5.source(this.dataAdapter);
        }
      },
      error: (error) => {
        console.error('Error loading fourth schedules:', error);
      },
    });
  }

  AppointmentAdd(event: any): void {
    const appointment = event.args.appointment.originalData;

    const subject_code = $('#subjectCode').val();
    const units = $('#units').val();
    const subject = $('#subject').val();
    const room = $('#room').val();
    const teacher = $('#teacher').val();

    const startDate = new Date(appointment.start);

    // If you need the name of the day instead of the numeric value
    const daysOfWeek: { [key: string]: string } = {
      SU: 'Sunday',
      MO: 'M',
      TU: 'T',
      WE: 'W',
      TH: 'TH',
      FR: 'F',
      SA: 'S',
    };

    // Extract and parse the recurrence pattern to get the days of the week
    const recurrencePattern = appointment.recurrencePattern?.toString() ?? '';
    const matchedDays = recurrencePattern.match(/BYDAY=([^;]+)/);
    const dayNames = matchedDays
      ? matchedDays[1]
          .split(',')
          .map((day: keyof typeof daysOfWeek) => daysOfWeek[day])
      : [
          daysOfWeek[
            Object.keys(daysOfWeek)[
              startDate.getDay()
            ] as keyof typeof daysOfWeek
          ],
        ];

    const dayName = dayNames.join(''); // Combine day names, e.g., "M, T"

    const newAppointment = {
      subject_code: subject_code,
      subject: subject,
      units: units,
      room: room,
      teacher: teacher,
      start: new Date(startDate),
      end: new Date(appointment.end),
      recurrencePattern: recurrencePattern || null,
      day: dayName, // Add the combined day names
      background: appointment.background,
    };

    console.log('Recurrence Pattern:', recurrencePattern);
    console.log('Parsed Days:', dayNames);

    this.sharedService.addSchedule(newAppointment).subscribe({
      next: (response) => {
        // this.alertService.success('Success adding schedule', {
        //   keepAfterRouteChange: true,
        // });
        appointment.id = response.id;

        this.source.localdata.push(appointment);
        this.scheduler5.source(this.dataAdapter);

        localStorage.setItem('scheduleAdded', 'true');

        window.location.reload();
      },

      error: (error) => {
        this.alertService.error('Error adding schedule', {
          keepAfterRouteChange: true,
          error,
        });
        console.log(teacher);
        console.log(units);
        // window.location.reload();
        console.log('asdasd');
      },
    });
  }

  editDialogCreate = (dialog: any, fields: any, editAppointment: any) => {
    let subjectCodeContainer = ` <div>
        <div class="jqx-scheduler-edit-dialog-label pr-0" style="padding-right: 0; padding-left: 0; ">Subject Code</div>
        <div class="jqx-scheduler-edit-dialog-field">
          <select id="subjectCode" name="subjectCode">
            <option value="IT110">IT110</option>
            <option value="IT111">IT111</option>
            <option value="ITVG">ITVG</option>
            <option value="UTS">UTS</option>
            <option value="MathWorld">MathWorld</option>
            <option value="Fil 1">Fil 1</option>
            <option value="PE 1">PE 1</option>
            <option value="NSTP 1">NSTP 1</option>
            <option value="MathPrep">MathPrep</option>
          </select>
        </div>
      </div>`;
    fields.subjectContainer.append(subjectCodeContainer);

    let subjectInput = `
    <div class="jqx-scheduler-edit-dialog-label">Subject</div>
      <div class="jqx-scheduler-edit-dialog-field">
        <select id="subject" name="subject">
          <option value="Readings in Philippine History">Readings in Philippine History</option>
          <option value="Science, Technology and Society">Science, Technology and Society</option>
          <option value="Physical Education">Physical Education</option>
          <option value="Introduction to Linguistics">Introduction to Linguistics</option>
          <option value="Retorika">Retorika</option>
           <option value="National Service Training Prog. 1">	National Service Training Prog. 1</option>
          <option value="Language, Culture and Society">Language, Culture and Society</option>
          <option value="Purposive Communication">Purposive Communication</option>
          <option value="Understanding the Self">Understanding the Self</option>
        </select>
      </div>
 `;

    fields.subjectContainer.append(subjectInput);

    let unitsContainer = ` <div>
        <div class="jqx-scheduler-edit-dialog-label">Units</div>
        <div class="jqx-scheduler-edit-dialog-field">
          <select id="units" name="units">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>`;
    fields.subjectContainer.append(unitsContainer);

    let roomContainer = ` <div>
    <div class="jqx-scheduler-edit-dialog-label">Room</div>
    <div class="jqx-scheduler-edit-dialog-field">
      <select id="room" name="room">
        <option value="Computer Lab 1">Computer Lab 1</option>
        <option value="Computer Lab 2">Computer Lab 2</option>
        <option value="301">301</option>
        <option value="302">302</option>
        <option value="303">303</option>
        <option value="304">304</option>
        <option value="305">305</option>
        <option value="306">306</option>
        <option value="307">307</option>
        <option value="308">308</option>
        <option value="309">309</option>
        <option value="310">310</option>
        <option value="311">311</option>
        <option value="312">312</option>
        <option value="313">313</option>
        <option value="314">314</option>
        <option value="315">315</option>
        <option value="316">316</option>
        <option value="317">317</option>
        <option value="318">318</option>
        <option value="319">319</option>
        <option value="320">320</option>
        <option value="321">321</option>
        <option value="323">323</option>
        <option value="324">324</option>
        <option value="325">325</option>
        <option value="326">326</option>




      </select>
    </div>
  </div>`;
    fields.subjectContainer.append(roomContainer);

    let teacherContainer = `
    <div>
      <div class="jqx-scheduler-edit-dialog-label">Teacher</div>
      <div class="jqx-scheduler-edit-dialog-field">
        <select id="teacher" name="teacher"></select>
      </div>
    </div>
  `;

    fields.subjectContainer.append(teacherContainer);

    const teacherSelect = document.getElementById('teacher');

    if (teacherSelect) {
      this.teachers.forEach((teacher: any) => {
        let option = document.createElement('option');
        option.value = `${teacher.firstName} ${teacher.lastName}`;
        option.text = `${teacher.firstName} ${teacher.lastName}`;
        teacherSelect.appendChild(option);
      });
    }
  };

  editDialogOpen = (dialog: any, fields: any, editAppointment: any) => {
    fields.subject.hide();
    fields.subjectLabel.hide();
    fields.descriptionContainer.hide();
    fields.statusContainer.hide();
    fields.timeZoneContainer.hide();
    fields.allDayContainer.hide();
    fields.locationContainer.hide();
    fields.resetExceptionsContainer.hide();

    setTimeout(() => {
      $(dialog).closest('.jqx-window').addClass('center-fixed-dialog');
    }, 10);

    if (editAppointment) {
      const appointmentData = editAppointment.originalData;
      setTimeout(() => {
        $('#subjectCode').val(appointmentData.subject_code);
        $('#units').val(appointmentData.units);
        $('#subject').val(appointmentData.subject);
        $('#room').val(appointmentData.room);
        $('#teacher').val(appointmentData.teacher);
      }, 100); // Slight delay to ensure elements are available
    }
  };

  source: any = {
    dataType: 'array',
    localdata: [], // Initialize with an empty array
    dataFields: [
      { name: 'id', type: 'string' },
      { name: 'subject', type: 'string' },
      { name: 'subject_code', type: 'string' },
      { name: 'units', type: 'string' },
      { name: 'room', type: 'string' },
      { name: 'teacher', type: 'string' },
      { name: 'day', type: 'string' },
      { name: 'readOnly', type: 'boolean' },
      { name: 'start', type: 'date' },
      { name: 'end', type: 'date' },
      { name: 'draggable', type: 'boolean' },
      { name: 'resizable', type: 'boolean' },
      { name: 'recurrencePattern', type: 'string' },
      { name: 'background', type: 'string' },
    ],
    id: 'id',
  };

  appointmentDataFields: any = {
    id: 'id',
    subject: 'subject',
    subject_code: 'subject_code',
    units: 'units',
    room: 'room',
    teacher: 'teacher',
    from: 'start',
    readOnly: 'readOnly',
    to: 'end',
    day: 'day',
    draggable: 'draggable',
    resizable: 'resizable',
    recurrencePattern: 'recurrencePattern',
    background: 'background',
  };

  date: any;
  dataAdapter: any;
  resources: any = {
    colorScheme: 'scheme05',
    dataField: 'calendar',
    source: new jqx.dataAdapter(this.source),
  };
  views: any[] = [
    {
      type: 'weekView',
      timeRuler: { hidden: false, scaleStartHour: 6 },
      allDay: false,
    },
  ];
}
