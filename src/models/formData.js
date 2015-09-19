module.exports = {
  create:function(data) {

    var questions = data.questions;
    var model = data.responses;

    var fields = {
        "textfield_11129643": "Profession",
        "dropdown_11131232": "Industry",
        "list_11127528_choice": "Paid",
        "number_11127686": "YearSalary",
        "number_11128164": "HourRate",
        "number_11129589": "DailyRate",
        "textfield_11127580": "Company",
        "number_11127571": "Experience",
        "listimage_11127523_choice": "Gender",
        "number_11127729": "PostCode",
        "list_11127526_choice": "Ethnicity",
        "list_11127526_other": "EthnicityOther",
        "dropdown_11129681": "Country"
      };

      var answers = [];

      model = model.map(function(response){
        var answers = {};
        for(var key in response.answers) {
          answers[fields[key]] = response.answers[key];
        }
        return answers;
      });

    return model;
  }
}
