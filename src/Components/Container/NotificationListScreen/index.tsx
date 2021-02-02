import React, {useState, useEffect} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

// Local Component
import NavigationHeader from '~/Components/Presentational/NavigationHeader';
import NotificationList from '~/Components/Presentational/NotificationListScreen/NotificationList';

// Route
import GETUserNotifications from '~/Routes/Notification/GETUserNotifications';
import DELETEUserNotifications from '~/Routes/Notification/DELETEUserNotifications';

const Container = Styled.View`
flex: 1;
background-color: #ffffff;
`;

const BodyContainer = Styled.View`
flex: 1;
background-color: #F5F7F9;
padding-bottom: 16px;
`;


interface Props {
    navigation: any,
    route: any,
}

const NotificationListScreen = ({navigation, route}: Props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [likeNotificationArray, setLikeNotificationArray] = useState<Array<any>>([]);
    const [eventNotificationArray, setEventNotificationArray] = useState<Array<any>>([]);
    const [commentNotificationArray, setCommentNotificationArray] = useState<Array<any>>([]);
    const [changeNotificationArray, setChangeNotificationArray] = useState<boolean>(false);

    const [likeNotifyIdArray, setLikeNotifyIdArray] = useState<Array<any>>(["null"]);
    const [eventNotifyIdArray, setEventNotifyIdArray] = useState<Array<any>>(["null"]);
    const [commentNotifyIdArray, setCommentNotifyIdArray] = useState<Array<any>>(["null"]);

    const [loadingGetLikeNotify, setLoadingGetLikeNotify] = useState<boolean>(true);
    const [loadingGetCommentNotify, setLoadingGetCommentNotify] = useState<boolean>(true);
    const [loadingGetEventNotify, setLoadingGetEventNotify] = useState<boolean>(true);
    const [refreshingNotification, setRefreshingNotification] = useState<boolean>(false);

    const jwtToken = useSelector((state: any) => state.currentUser).jwtToken;

    useEffect(() => {

        GETUserNotifications(jwtToken, "Like")
        .then((response: any) => {
            console.log("GETUserNotifications response", response);
            setLikeNotificationArray(response);
            setLoadingGetLikeNotify(false);
        })
        .catch((error) => {
            console.log("GETUserNotifications error", error);
            setLoadingGetLikeNotify(false);
        })

        GETUserNotifications(jwtToken, "Event")
        .then((response: any) => {
            console.log("GETUserNotifications response", response);
            setEventNotificationArray(response);
            setLoadingGetEventNotify(false);
        })
        .catch((error) => {
            console.log("GETUserNotifications error", error);
            setLoadingGetLikeNotify(false);
        })

        GETUserNotifications(jwtToken, "Comment")
        .then((response: any) => {
            console.log("GETUserNotifications response", response);
            setCommentNotificationArray(response);
            setLoadingGetCommentNotify(false);
        })
        .catch((error) => {
            console.log("GETUserNotifications error", error);
            setLoadingGetLikeNotify(false);
        })
    }, [])
    
    const goBack = () => {
        navigation.goBack();
    }

    const clickEdit = () => {
        setIsEditing(true);
    }

    const onRefreshNotificationArray = () => {
        setRefreshingNotification(true);
        try {
            GETUserNotifications(jwtToken, "Like")
            .then((response: any) => {
                console.log("GETUserNotifications response like", response);
                setLikeNotificationArray(response);
            })
            .catch((error) => {
                console.log("GETUserNotifications error", error);
            })
    
            GETUserNotifications(jwtToken, "Event")
            .then((response: any) => {
                console.log("GETUserNotifications response event", response);
                setEventNotificationArray(response);
            })
            .catch((error) => {
                console.log("GETUserNotifications error", error);
            })
    
            GETUserNotifications(jwtToken, "Comment")
            .then((response: any) => {
                console.log("GETUserNotifications response comment", response);
                setCommentNotificationArray(response);
            })
            .catch((error) => {
                console.log("GETUserNotifications error", error);
            })
        } catch(e) {
            setRefreshingNotification(false);
        } finally {
            setRefreshingNotification(false);
        }

    }

    const deleteNotification = async () => {
        setIsEditing(false);

        console.log("likeNotifyIdArray", likeNotifyIdArray);
        console.log("eventNotifyIdArray", eventNotifyIdArray);
        console.log("commentNotifyIdArray", commentNotifyIdArray);
        // setSelectedIdArray([]);
        // console.log("deleteNotification")

        const tmpLikeArray = [...likeNotificationArray];
        const tmpEventArray = [...eventNotificationArray];
        const tmpCommentArray = [...commentNotificationArray];

        const formattedIdArray = new Array();

        function deleteNotifyIdArray() {
            for (let i = commentNotifyIdArray.length - 1; i >= 1; i--) {
                tmpCommentArray.splice(commentNotifyIdArray[i].index, 1);
                formattedIdArray.push(commentNotifyIdArray[i].id);
            }

            for (let i = likeNotifyIdArray.length - 1; i >= 1; i--) {
                tmpLikeArray.splice(likeNotifyIdArray[i].index, 1);
                formattedIdArray.push(commentNotifyIdArray[i].id);
            }

            for (let i = eventNotifyIdArray.length - 1; i >= 1; i--) {
                tmpEventArray.splice(eventNotifyIdArray[i].index, 1);
                formattedIdArray.push(commentNotifyIdArray[i].id);
            }
        }

        await deleteNotifyIdArray();
        setCommentNotificationArray(tmpCommentArray);
        setLikeNotificationArray(tmpLikeArray);
        setEventNotificationArray(tmpEventArray);
        setCommentNotifyIdArray(["null"]);
        setLikeNotifyIdArray(["null"]);
        setEventNotifyIdArray(["null"]);

        DELETEUserNotifications({jwtToken, formattedIdArray})
        .then((response) => {
            console.log("DELETEUserNotifications response", response)
        })
        .catch((error) => {
            console.log("DELETEUserNotifications error", error)
        })
    }

    const selectNotificationItem = (id: number, type: string, index: number) => {

        const notificationObj = {
            id,
            index,
        }

        if(type === "Like") {
            setLikeNotifyIdArray((prevState) => {
                const selectedIndex = prevState.findIndex((item, index) => {
                    if(id === item.id) {
                        return index;
                    }
                });
    
                if(selectedIndex === -1) {
                    const tmpPrevState = [...prevState];
                    tmpPrevState.push(notificationObj);
    
                    return tmpPrevState;
                } else {
                    const tmpPrevState = prevState.concat();
                    tmpPrevState.splice(selectedIndex, 1)
                    return tmpPrevState;
                }
            })
        } else if(type === "Event") {
            setEventNotifyIdArray((prevState) => {
                const selectedIndex = prevState.findIndex((item, index) => {
                    if(id === item.id) {
                        return index;
                    }
                });
    
                if(selectedIndex === -1) {
                    const tmpPrevState = [...prevState];
                    tmpPrevState.push(notificationObj);
    
                    return tmpPrevState;
                } else {
                    const tmpPrevState = prevState.concat();
                    tmpPrevState.splice(selectedIndex, 1)
                    return tmpPrevState;
                }
            })
        } else if(type === "Comment") {
            setCommentNotifyIdArray((prevState) => {
                const selectedIndex = prevState.findIndex((item, index) => {
                    if(id === item.id) {
                        return index;
                    }
                });
    
                if(selectedIndex === -1) {
                    const tmpPrevState = [...prevState];
                    tmpPrevState.push(notificationObj);
    
                    return tmpPrevState;
                } else {
                    const tmpPrevState = prevState.concat();
                    tmpPrevState.splice(selectedIndex, 1)
                    return tmpPrevState;
                }
            })
        }

    }

    return (
        <Container as={SafeAreaView} forceInset={{top: 'always'}}>
            <NavigationHeader
            headerLeftProps={{type: "arrow", onPress: goBack}}
            headerRightProps={!isEditing ? {type: "text", text: "편집", fontColor: "#4E525D", onPress: clickEdit} : {type: "text", text: "삭제", fontColor: "#00D1FF", onPress: deleteNotification}}
            headerTitle={"알림"}
            />
            <BodyContainer>
                <NotificationList
                navigation={navigation}
                route={route}
                refreshingNotification={refreshingNotification}
                onRefreshNotificationArray={onRefreshNotificationArray}
                loadingGetEventNotify={loadingGetEventNotify}
                loadingGetCommentNotify={loadingGetCommentNotify}
                loadingGetLikeNotify={loadingGetLikeNotify}
                commentNotifyIdArray={commentNotifyIdArray}
                likeNotifyIdArray={likeNotifyIdArray}
                eventNotifyIdArray={eventNotifyIdArray}
                selectNotificationItem={selectNotificationItem}
                isEditing={isEditing}
                likeNotificationArray={likeNotificationArray}
                eventNotificationArray={eventNotificationArray}
                commentNotificationArray={commentNotificationArray}/>
            </BodyContainer>
        </Container>
    )
}

export default NotificationListScreen;


const TEST_NOTIFICATION_DATA = {
    like: [
    {
        type: "like",
        user: {
            profileImageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoU0TZbbxdkql-91CkCAXg13dAZMVqlaz7CQ&usqp=CAU",
            nickname: "알림테스트"
        },
        description: "회원님의 글을 좋아합니다.",
        data: "2021-01-25",
        id: 1,
    },
    {
        type: "like",
        user: {
            profileImageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoU0TZbbxdkql-91CkCAXg13dAZMVqlaz7CQ&usqp=CAU",
            nickname: "알림테스트"
        },
        description: "회원님의 글을 좋아합니다.",
        data: "2021-01-25",
        id: 2,
    },
    {
        type: "like",
        user: {
            profileImageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoU0TZbbxdkql-91CkCAXg13dAZMVqlaz7CQ&usqp=CAU",
            nickname: "알림테스트"
        },
        description: "회원님의 글을 좋아합니다.",
        data: "2021-01-25",
        id: 3,
    },
    {
        type: "like",
        user: {
            profileImageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoU0TZbbxdkql-91CkCAXg13dAZMVqlaz7CQ&usqp=CAU",
            nickname: "알림테스트"
        },
        description: "회원님의 글을 좋아합니다.",
        data: "2021-01-25",
        id: 4,
    },
    {
        type: "like",
        user: {
            profileImageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoU0TZbbxdkql-91CkCAXg13dAZMVqlaz7CQ&usqp=CAU",
            nickname: "알림테스트"
        },
        description: "회원님의 글을 좋아합니다.",
        data: "2021-01-25",
        id: 5,
    },
    ],
    event: [
        {
            type: "event",
            user: {
                profileImageUri: "http://hil.or.kr/wp-content/uploads/2018/08/%EB%8C%80%EC%A0%84%EC%84%A0%EC%B9%98%EA%B3%BC%EB%B3%91%EC%9B%9001s.jpg",
                nickname: "광교좋은날치과병원"
            },
            description: "봄맞이 스케일링이벤트가 진행됩니다.",
            data: "2021-02-01",
            id: 6,
        },
        {
            type: "event",
            user: {
                profileImageUri: "http://hil.or.kr/wp-content/uploads/2018/08/%EB%8C%80%EC%A0%84%EC%84%A0%EC%B9%98%EA%B3%BC%EB%B3%91%EC%9B%9001s.jpg",
                nickname: "광교좋은날치과병원"
            },
            description: "치과병원은 구강악안면외과, 치과보존과, 치과보철과, 소아치과, 치과교정과, 치주과 6개 영역으로 진료영역을 특화해 최상의 치료를 제공합니다. 각 진료과는 고유의 영역을 전문적·독립적으로 진료하며, 동시에 환자 상태에 따라 관련 과와 협진하여 환자 중심의 맞춤 진료를 진행합니다.",
            data: "2021-01-25",
            id: 7,
        },
        {
            type: "event",
            user: {
                profileImageUri: "http://hil.or.kr/wp-content/uploads/2018/08/%EB%8C%80%EC%A0%84%EC%84%A0%EC%B9%98%EA%B3%BC%EB%B3%91%EC%9B%9001s.jpg",
                nickname: "알림테스트"
            },
            description: "회원님의 글을 좋아합니다.",
            data: "2021-01-25",
            id: 8,
        },
        ],
        comment: [
            {
                type: "comment",
                user: {
                    profileImageUri: "https://cdn.ajoumc.or.kr/Upload/MedicalCenter/Doctor/Profile/201812/20181203133458927.jpg",
                    nickname: "치과의사"
                },
                description: "회원님의 글에 댓글을 남겼습니다.",
                data: "2021-02-01",
                id: 9,
            },
            {
                type: "comment",
                user: {
                    profileImageUri: "https://cdn.ajoumc.or.kr/Upload/MedicalCenter/Doctor/Profile/201812/20181203133458927.jpg",
                    nickname: "치과의사"
                },
                description: "회원님의 글에 댓글을 남겼습니다.",
                data: "2021-01-25",
                id: 10,
            },
            {
                type: "comment",
                user: {
                    profileImageUri: "https://cdn.ajoumc.or.kr/Upload/MedicalCenter/Doctor/Profile/201812/20181203133458927.jpg",
                    nickname: "치과의사"
                },
                description: "회원님의 글에 댓글을 남겼습니다.",
                data: "2021-01-25",
                id: 11,
            },
            ]
}
