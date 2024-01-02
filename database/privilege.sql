GO
USE QLPhongKham
GO
CREATE OR ALTER PROC sp_createDatabaseUser
AS
SET XACT_ABORT, NOCOUNT ON
BEGIN
  BEGIN TRY
    CREATE LOGIN guest WITH PASSWORD = 'guest'
    CREATE LOGIN customer WITH PASSWORD = 'customer'
    CREATE LOGIN staff WITH PASSWORD = 'staff'
    CREATE LOGIN dentist WITH PASSWORD = 'dentist'
    CREATE LOGIN admin WITH PASSWORD = 'admin'

    CREATE USER guestUser FOR LOGIN guest
    CREATE USER customerUser FOR LOGIN customer
    CREATE USER staffUser FOR LOGIN staff
    CREATE USER dentistUser FOR LOGIN dentist
    CREATE USER adminUser FOR LOGIN admin

    CREATE ROLE guestRole
    CREATE ROLE customerRole
    CREATE ROLE staffRole
    CREATE ROLE dentistRole
    CREATE ROLE adminRole

    ALTER ROLE guestRole ADD MEMBER guestUser
    ALTER ROLE customerRole ADD MEMBER customerUser
    ALTER ROLE dentistRole ADD MEMBER dentistUser
    ALTER ROLE staffRole ADD MEMBER staffUser
    ALTER ROLE adminRole ADD MEMBER adminUser

-- Auth
    GRANT EXEC ON dbo.sp_signUp TO guestRole
    GRANT EXEC ON dbo.sp_login TO guestRole
    GRANT EXEC ON dbo.sp_login TO staffRole
    GRANT EXEC ON dbo.sp_login TO dentistRole
    GRANT EXEC ON dbo.sp_login TO adminRole

-- Guest role
  
    GRANT EXEC ON dbo.sp_viewOneDentist TO guestRole
    GRANT EXEC ON dbo.sp_viewAllDentist TO guestRole
    GRANT EXEC ON dbo.sp_makeAppointment TO guestRole
    GRANT EXEC ON dbo.sp_cancelAppointment TO guestRole
    GRANT EXEC ON dbo.sp_viewOneAppointment TO guestRole
    GRANT EXEC ON dbo.sp_viewOneService TO guestRole
    GRANT EXEC ON dbo.sp_viewAllService TO guestRole
    GRANT EXEC ON dbo.sp_viewDentistSchedule TO guestRole
    GRANT EXEC ON dbo.sp_viewAllScheduleAvailable TO guestRole
    GRANT EXEC ON dbo.sp_viewScheduleAvailableOnDay TO guestRole
    GRANT EXEC ON dbo.sp_getDentistHaveSchedule TO guestRole

-- Customer role
    GRANT EXEC ON dbo.sp_viewOneCustomer TO customerRole
    GRANT EXEC ON dbo.sp_updateCustomerProfile TO customerRole
    GRANT EXEC ON dbo.sp_changeCustomerPassword TO customerRole
    GRANT EXEC ON dbo.sp_viewOneDentist TO customerRole
    GRANT EXEC ON dbo.sp_viewAllDentist TO customerRole
    GRANT EXEC ON dbo.sp_viewAllAppointment TO customerRole
    GRANT EXEC ON dbo.sp_makeAppointment TO customerRole
    GRANT EXEC ON dbo.sp_cancelAppointment TO customerRole
    GRANT EXEC ON dbo.sp_viewOneAppointment TO customerRole
    GRANT EXEC ON dbo.sp_viewCustomerAppointment TO customerRole
    GRANT EXEC ON dbo.sp_viewOnePatientRecord TO customerRole 
    GRANT EXEC ON dbo.sp_viewCustomerPatientRecord TO customerRole
    GRANT EXEC ON dbo.sp_viewPrescribeMedicine TO customerRole
    GRANT EXEC ON dbo.sp_viewOneService TO customerRole
    GRANT EXEC ON dbo.sp_viewAllService TO customerRole
    GRANT EXEC ON dbo.sp_viewServiceUse TO customerRole
    GRANT EXEC ON dbo.sp_viewInvoiceById TO customerRole
    GRANT EXEC ON dbo.sp_viewInvoiceByRecordId TO customerRole
    GRANT EXEC ON dbo.sp_viewDentistSchedule TO customerRole
    GRANT EXEC ON dbo.sp_viewAllScheduleAvailable TO customerRole
    GRANT EXEC ON dbo.sp_viewScheduleAvailableOnDay TO customerRole
    GRANT EXEC ON dbo.sp_getDentistHaveSchedule TO customerRole
  

-- Staff role
    GRANT EXEC ON dbo.sp_viewOneCustomer TO staffRole
    GRANT EXEC ON dbo.sp_viewOneDentist TO staffRole
    GRANT EXEC ON dbo.sp_viewAllDentist TO staffRole
    GRANT EXEC ON dbo.sp_viewAllAppointment TO staffRole
    GRANT EXEC ON dbo.sp_viewOneStaff TO staffRole
    GRANT EXEC ON dbo.sp_makeAppointment TO staffRole
    GRANT EXEC ON dbo.sp_cancelAppointment TO staffRole
    GRANT EXEC ON dbo.sp_updateAppointmentStatus TO staffRole
    GRANT EXEC ON dbo.sp_viewOneAppointment TO staffRole
    GRANT EXEC ON dbo.sp_viewOnePatientRecord TO staffRole 
    GRANT EXEC ON dbo.sp_viewPrescribeMedicine TO staffRole
    GRANT EXEC ON dbo.sp_viewServiceUse TO staffRole
    GRANT EXEC ON dbo.sp_updateInvoiceStatus TO staffRole
    GRANT EXEC ON dbo.sp_viewInvoiceById TO staffRole
    GRANT EXEC ON dbo.sp_viewInvoiceByRecordId TO staffRole
    GRANT EXEC ON dbo.sp_viewStaffInvoice TO staffRole
    GRANT EXEC ON dbo.sp_viewDentistSchedule TO staffRole
    GRANT EXEC ON dbo.sp_viewAllScheduleAvailable TO staffRole
    GRANT EXEC ON dbo.sp_viewScheduleAvailableOnDay TO staffRole
    GRANT EXEC ON dbo.sp_getDentistHaveSchedule TO staffRole
    GRANT EXEC ON dbo.sp_addInvoice TO staffRole
    GRANT EXEC ON dbo.sp_viewAllPatientRecord to staffRole

-- Dentist role
    GRANT EXEC ON dbo.sp_viewOneCustomer TO dentistRole
    GRANT EXEC ON dbo.sp_viewOneDentist TO dentistRole  
    GRANT EXEC ON dbo.sp_viewAllDentist TO dentistRole
    GRANT EXEC ON dbo.sp_updateDentistProfile TO dentistRole
    GRANT EXEC ON dbo.sp_changeDentistPassword TO dentistRole
    GRANT EXEC ON dbo.sp_updateAppointmentStatus TO dentistRole
    GRANT EXEC ON dbo.sp_viewOneAppointment TO dentistRole
    GRANT EXEC ON dbo.sp_viewDentistAppointment TO dentistRole 
    GRANT EXEC ON dbo.sp_createPatientRecord TO dentistRole 
    GRANT EXEC ON dbo.sp_updatePatientRecord TO dentistRole 
    GRANT EXEC ON dbo.sp_deletePatientRecord TO dentistRole 
    GRANT EXEC ON dbo.sp_viewOnePatientRecord TO dentistRole
    GRANT EXEC ON dbo.sp_viewAllCustomer TO dentistRole
    GRANT EXEC ON dbo.sp_viewCustomerPatientRecord TO dentistRole
    GRANT EXEC ON dbo.sp_viewOneMedicine TO dentistRole
    GRANT EXEC ON dbo.sp_viewAllMedicine TO dentistRole
    GRANT EXEC ON dbo.sp_addPrescribeMedicine TO dentistRole
    GRANT EXEC ON dbo.sp_updatePrescribeMedicine TO dentistRole
    GRANT EXEC ON dbo.sp_deletePrescribeMedicine TO dentistRole
    GRANT EXEC ON dbo.sp_viewPrescribeMedicine TO dentistRole
    GRANT EXEC ON dbo.sp_viewOneService TO dentistRole
    GRANT EXEC ON dbo.sp_viewAllService TO dentistRole
    GRANT EXEC ON dbo.sp_addServiceUse TO dentistRole
    GRANT EXEC ON dbo.sp_deleteServiceUse TO dentistRole
    GRANT EXEC ON dbo.sp_viewServiceUse TO dentistRole
    GRANT EXEC ON dbo.sp_addDentistSchedule TO dentistRole
    GRANT EXEC ON dbo.sp_deleteDentistSchedule TO dentistRole
    GRANT EXEC ON dbo.sp_viewDentistSchedule TO dentistRole
    GRANT EXEC ON dbo.sp_viewAllSchedule TO dentistRole
    GRANT EXEC ON dbo.sp_viewDentistPatientRecord to dentistRole
    GRANT EXEC ON dbo.sp_viewFullslotSchedule to dentistRole

-- Admin role
    GRANT EXEC ON dbo.sp_viewOneCustomer TO adminRole
    GRANT EXEC ON dbo.sp_viewAllCustomer TO adminRole
    GRANT EXEC ON dbo.sp_updateCustomerProfile TO adminRole
    GRANT EXEC ON dbo.sp_blockUser TO adminRole  
    GRANT EXEC ON dbo.sp_changeCustomerPassword TO adminRole
    GRANT EXEC ON dbo.sp_createDentist TO adminRole
    GRANT EXEC ON dbo.sp_createStaff TO adminRole
    GRANT EXEC ON dbo.sp_viewOneDentist TO adminRole  
    GRANT EXEC ON dbo.sp_viewAllDentist TO adminRole
    GRANT EXEC ON dbo.sp_updateDentistProfile TO adminRole -- x
    GRANT EXEC ON dbo.sp_changeDentistPassword TO adminRole -- x
    GRANT EXEC ON dbo.sp_viewAllAppointment TO adminRole -- x
    GRANT EXEC ON dbo.sp_viewOneStaff TO adminRole  -- x
    GRANT EXEC ON dbo.sp_viewAllStaff TO adminRole
    GRANT EXEC ON dbo.sp_deleteAppointment TO adminRole -- x
    GRANT EXEC ON dbo.sp_viewOneAppointment TO adminRole -- x
    GRANT EXEC ON dbo.sp_viewAllAppointment TO adminRole
    GRANT EXEC ON dbo.sp_viewCustomerAppointment TO adminRole
    GRANT EXEC ON dbo.sp_viewDentistAppointment TO adminRole 
    GRANT EXEC ON dbo.sp_updatePatientRecord TO adminRole 
    GRANT EXEC ON dbo.sp_deletePatientRecord TO adminRole 
    GRANT EXEC ON dbo.sp_viewOnePatientRecord TO adminRole 
    GRANT EXEC ON dbo.sp_viewAllPatientRecord TO adminRole 
    GRANT EXEC ON dbo.sp_viewCustomerPatientRecord TO adminRole
    GRANT EXEC ON dbo.sp_createMedicine TO adminRole 
    GRANT EXEC ON dbo.sp_updateMedicine TO adminRole 
    GRANT EXEC ON dbo.sp_deleteMedicine TO adminRole 
    GRANT EXEC ON dbo.sp_viewOneMedicine TO adminRole
    GRANT EXEC ON dbo.sp_viewAllMedicine TO adminRole
    GRANT EXEC ON dbo.sp_viewPrescribeMedicine TO adminRole
    GRANT EXEC ON dbo.sp_addService TO adminRole
    GRANT EXEC ON dbo.sp_updateService TO adminRole
    GRANT EXEC ON dbo.sp_viewOneService TO adminRole
    GRANT EXEC ON dbo.sp_viewAllService TO adminRole
    GRANT EXEC ON dbo.sp_viewServiceUse TO adminRole
    GRANT EXEC ON dbo.sp_updateInvoiceStatus TO adminRole
    GRANT EXEC ON dbo.sp_viewInvoiceById TO adminRole
    GRANT EXEC ON dbo.sp_viewInvoiceByRecordId TO adminRole
    GRANT EXEC ON dbo.sp_viewStaffInvoice TO adminRole
    GRANT EXEC ON dbo.sp_addDentistSchedule TO adminRole
    GRANT EXEC ON dbo.sp_deleteDentistSchedule TO adminRole
    GRANT EXEC ON dbo.sp_viewDentistSchedule TO adminRole
    GRANT EXEC ON dbo.sp_viewAllSchedule TO adminRole
    GRANT EXEC ON dbo.sp_addInvoice TO adminRole -- x

	GRANT SELECT ON CUSTOMER TO adminRole  
	GRANT UPDATE ON CUSTOMER TO adminRole

	GRANT SELECT ON STAFF TO adminRole  
	GRANT UPDATE ON STAFF TO adminRole

	GRANT SELECT ON DENTIST TO adminRole  
	GRANT UPDATE ON DENTIST TO adminRole

    GRANT SELECT ON CUSTOMER TO customerRole
    GRANT SELECT ON STAFF TO staffRole
    GRANT SELECT ON DENTIST TO dentistRole
    GRANT SELECT ON ADMIN TO adminRole  
    GRANT SELECT ON DENTIST TO adminRole  
    GRANT UPDATE ON DENTIST TO adminRole  

  END TRY
  BEGIN CATCH
    ;THROW
  END CATCH
END

GO
EXEC sp_createDatabaseUser

