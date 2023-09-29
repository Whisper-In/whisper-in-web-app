import { IUserProfileDto } from "@/dtos/user/user.dtos";
import axiosInstance from "../axios";
import { ICreatePaymentSheetDto } from "@/dtos/payment/payment.dtos";

const route = "user";

export const createUserSubscription = async (profileId: string, tier?: number, subscriptionId?: string) => {
  try {
    const result = await axiosInstance.post(`${route}/subscription`, { profileId, tier, subscriptionId });

    return result.data;
  } catch (error) {
    throw error;
  }
}

export const getUserProfile = async () => {
  try {
    const result = await axiosInstance.get<IUserProfileDto>(`${route}`);

    return result.data;
  } catch (error) {
    throw error;
  }
}

export const updateUserProfile = async (userProfile: IUserProfileDto) => {
  try {
    const result = await axiosInstance.put(route, userProfile);

    return result.data;
  } catch (error) {
    throw error;
  }
}

export const updateUserTnC = async (userId: string, isAgreeTnC: boolean) => {
  try {
    const result = await axiosInstance.put(`${route}/tnc`, { userId, isAgreeTnC });

    return result.data;
  } catch (error) {
    throw error;
  }
}

export const updateUserAvatar = async (formData: FormData) => {
  try {
    const result = await axiosInstance.put(
      `${route}/avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return result.data;
  } catch (error) {
    throw error;
  }
}

export const updateUserVoice = async (formData: FormData) => {
  try {
    const result = await axiosInstance.put(
      `${route}/voice`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return result.data;
  } catch (error) {
    throw error;
  }
}

export const createPaymentSheet = async (profileId: string, tier: number) => {

  try {
    const result = await axiosInstance.post(`${route}/payment-subscription`, {
      profileId, tier
    });

    return <ICreatePaymentSheetDto>result.data;
  } catch (error) {
    console.log(error)
  }
}



export const createPaymentSubscription = async (profileId: string, tier: number) => {

  try {
    const result = await axiosInstance.post(`${route}/payment-subscription`, {
      profileId, tier
    });

    return <ICreatePaymentSheetDto>result.data;
  } catch (error) {
    console.log(error)
  }
}


export const cancelPaymentSubscription = async (profileId: string) => {
  try {
    const result = await axiosInstance.post(`${route}/cancel-subscription`, {
      profileId
    });

    return result.data;
  } catch (error) {
    console.log(error)
  }
}