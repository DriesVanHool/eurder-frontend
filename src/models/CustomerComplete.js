export function setCustomerData(data){
    return {
        firstname: data.firstname,
        lastname: data.lastname,
        email: {
            localPart: data.localPart,
            domain: data.domain,
            complete: data.complete
        },
        address: {
            streetName: data.streetName,
            houseNumber: data.houseNumber,
            postalCode: data.postalCode,
            country: data.country
        },
        phoneNumber: {
            number: data.number,
            countryCallingCode: data.countryCallingCode
        }
    }
}