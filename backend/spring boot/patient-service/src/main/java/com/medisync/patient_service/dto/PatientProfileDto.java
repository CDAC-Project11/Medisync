package com.medisync.patient_service.dto;

public class PatientProfileDto {

    private Long id;
    private String patientCode;
    private String name;
    private String gender;
    private String bloodGroup;
    private String mobile;
    private String email;
    private String address;

    public PatientProfileDto(Long id, String patientCode, String name,
                             String gender, String bloodGroup,
                             String mobile, String email, String address) {
        this.id = id;
        this.patientCode = patientCode;
        this.name = name;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.mobile = mobile;
        this.email = email;
        this.address = address;
    }

    public Long getId() { return id; }
    public String getPatientCode() { return patientCode; }
    public String getName() { return name; }
    public String getGender() { return gender; }
    public String getBloodGroup() { return bloodGroup; }
    public String getMobile() { return mobile; }
    public String getEmail() { return email; }
    public String getAddress() { return address; }
}
