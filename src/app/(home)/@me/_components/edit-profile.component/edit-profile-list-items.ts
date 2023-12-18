import { UserProfile } from "@/store/types/user.types"
import { IPriceTierDto } from "@/dtos/user/user.dtos"
import { TextInputProps } from "../edit-profile-input.component"
import { Dispatch, ThunkDispatch } from "@reduxjs/toolkit"
import { updateUserProfile, updateUserVoice } from "@/store/thunks/user.thunks"
import { useAppDispatch } from "@/store/hooks"
import { AppDispatch } from "@/store/store"

export type ProfileItemType = {
    label?: string,
    hideValue?: boolean,
    placeholder?: string,
    disableEdit?: boolean,
    onSave?: (value?: string) => void,
} & TextInputProps


export const GetProfileListItems = ({ me, dispatch }: { me?: UserProfile, dispatch: AppDispatch }): ProfileItemType[] =>
    [
        {
            label: "Name",
            placeholder: "Add your name",
            value: me?.name,
            maxLength: 64,
            required: true,
            validations: [{
                minLength: 2,
                customErrors: {
                    pattern: "Minimum 2 characters are required."
                }
            },
            {
                pattern: /^[\w\s]*$/gi,
                customErrors: {
                    pattern: "Name can only consists of alphabets and white space."
                }
            }],
            onSave: (value) => dispatch(updateUserProfile({ ...me!, name: value }))
        },
        {
            label: "Username",
            placeholder: "Add a username",
            value: me?.userName,
            maxLength: 64,
            required: true,
            validations: [{
                minLength: 2,
                customErrors: {
                    pattern: "Minimum 2 characters are required."
                }
            },
            {
                pattern: /^[a-z0-9_-]*$/gi,
                customErrors: {
                    pattern: "Name can only consists of alphanumeric characters, _ and -."
                }
            }],
            onSave: (value) => dispatch(updateUserProfile({ ...me!, userName: value }))
        },
        {
            label: "Email",
            placeholder: "Add an email",
            value: me?.email,
            disableEdit: true
        },
        {
            label: "Bio",
            placeholder: "Add a bio",
            variant: "text-field",
            value: me?.bio,
            maxLength: 150,
            onSave: (value) => dispatch(updateUserProfile({ ...me!, bio: value }))
        },
        {
            label: "Instagram",
            placeholder: "Add an Instagram link",
            value: me?.instagram,
            maxLength: 128,
            validations: [{
                pattern: /(?:instagram.com|instagr.am|instagr.com)/gi,
                customErrors: {
                    pattern: "Invalid Intagram url."
                }
            }],
            onSave: (value) => dispatch(updateUserProfile({ ...me!, instagram: value }))
        },
        {
            label: "YouTube",
            placeholder: "Add a YouTube channel",
            value: me?.youtube,
            maxLength: 128,
            validations: [{
                pattern: /(?:youtube.com)/gi,
                customErrors: {
                    pattern: "Invalid Youtube url."
                }
            }],
            onSave: (value) => dispatch(updateUserProfile({ ...me!, youtube: value }))
        }
    ]

export const GetSubscriptionListItems = ({ me, minSubscriptionFee, dispatch }
    : { me?: UserProfile, minSubscriptionFee: number, dispatch: AppDispatch }): ProfileItemType[] =>
    [
        {
            label: "Subscription Fee",
            placeholder: "Add a susbscription fee",
            value: (me?.priceTiers?.length ? me?.priceTiers[0].price : 0).toFixed(2),
            min: minSubscriptionFee,
            max: 999,
            variant: "number",
            required: true,
            validations: [{
                min: minSubscriptionFee,
            }],
            onSave: (value) => {
                const priceTier: IPriceTierDto = me?.priceTiers?.length ? { ...me.priceTiers[0] } : {
                    features: [],
                    tier: 0,
                    price: 0
                };

                priceTier.price = Number.parseFloat(value ?? "0") || minSubscriptionFee;

                dispatch(updateUserProfile({ ...me!, priceTiers: [priceTier] }))
            }
        },
        {
            label: "Stripe",
            required: true,
            validations: [{
                pattern: /acct_[\w\d_]+/gi,
                customErrors: {
                    pattern: "Add a valid Stripe account id to receive subscription payments. Eg. acct_xxxxx"
                }
            }],
            value: me?.stripeConnectedAccountId,
            placeholder: "Link your Stripe account",
            onSave: (value) => dispatch(updateUserProfile({ ...me!, stripeConnectedAccountId: value }))
        },
        {
            label: "Personalization",
            variant: "text-field",
            maxLength: 250,
            validations: [{
                maxLength: 250
            }],
            value: me?.aiDescription,
            placeholder: "Describe your AI personality",
            onSave: (value) => dispatch(updateUserProfile({ ...me!, aiDescription: value }))
        },
        // {
        //     label: "Audio",
        //     variant: "audio",
        //     hideValue: true,
        //     value: me?.voiceSampleURL,
        //     placeholder: !me?.voiceSampleURL ? "Upload 5 minutes of your voice sample" : "Update your voice sample",
        //     validations: [{
        //         min: 60 * 5,
        //         max: 60 * 20,
        //         customErrors: {
        //             min: "Audio sample has to be at least 5 minutes long.",
        //             max: "Audio sample cannnot be more than 20 minutes long."
        //         }
        //     }],
        //     onSave: async (value) => {
        //         try {
        //             let file: File | undefined;
        //             if (value) {
        //                 const blob = await fetch(value).then(result => result.blob());
        //                 file = new File([blob], "voice-sample");
        //             }

        //             //Send to update voice api
        //             await dispatch(updateUserVoice(file));
        //         } catch (error) {
        //             throw error;
        //         }
        //     }
        // }
    ]