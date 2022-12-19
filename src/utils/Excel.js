import moment from "moment";

export const SurveyEntriesToExcel = (surveyEntries) =>
  surveyEntries.map((entry) => {
    const {
      id,
      questionnaireId,
      finishTime,
      startTime,
      by,
      location,
      createdAt,
    } = entry;
    const SD = moment(startTime);
    const ED = moment(finishTime);
    const duration = ED.diff(SD, "seconds");
    const created = moment(createdAt).format("DD/MM/YYYY, hh:mm:ss a");
    const userName = by?.name || "-";
    const userEmail = by?.email || "-";
    const locationName = location?.location || "-";
    const locationInchargeMail = location?.inchargeEmail || "-";
    return {
      SurveyEntryId: id,
      QuestionnaireId: questionnaireId,
      Date: created,
      duration: duration,
      UserName: userName,
      UserEmail: userEmail,
      LocationName: locationName,
      LocationMail: locationInchargeMail,
    };
  });
