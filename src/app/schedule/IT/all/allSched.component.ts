import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { SharedService } from 'src/app/shared.service';

@Component({
  templateUrl: 'allSched.component.html',
})
export class allSchedComponent implements AfterViewInit {
  @ViewChild('schedulerReference5') scheduler5!: jqxSchedulerComponent;

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

  constructor(private sharedService: SharedService) {}

  ngAfterViewInit(): void {
    this.generateAppointments();
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
}
