const zoom = {
  type: "app",
  app: "zoom",
};

module.exports = {
  name: "Webinar Ended",
  version: "0.0.1",
  dedupe: "unique", // Dedupe based on meeting ID
  props: {
    zoom,
    zoomApphook: {
      type: "$.interface.apphook",
      appProp: "zoom",
      eventNames: ["webinar.ended"],
    },
  },
  async run(event) {
    const { payload } = event;
    const { object } = payload;
    this.$emit(
      { event: "webinar.ended", payload },
      {
        summary: object.topic,
        id: object.uuid,
        ts: +new Date(object.start_time),
      }
    );
  },
};
