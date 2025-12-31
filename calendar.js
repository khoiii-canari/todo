document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  // Load event từ localStorage
  let savedEvents = JSON.parse(localStorage.getItem("events")) || [];

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    selectable: true,
    editable: true,
    events: savedEvents,

    // Click để thêm event
    select(info) {
      const title = prompt("Tên công việc:");
      if (title) {
        const event = {
          title: title,
          start: info.startStr,
          end: info.endStr,
        };
        calendar.addEvent(event);
        savedEvents.push(event);
        localStorage.setItem("events", JSON.stringify(savedEvents));
      }
    },

    // Click event để xóa
    eventClick(info) {
      if (confirm("Xóa công việc này?")) {
        info.event.remove();
        savedEvents = savedEvents.filter((e) => e.title !== info.event.title);
        localStorage.setItem("events", JSON.stringify(savedEvents));
      }
    },
  });

  calendar.render();
});
