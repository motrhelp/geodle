import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Modal, TouchableOpacity } from 'react-native';

import { GameOverMessage, GlobeLink, ShareButton } from './GameOver';
import { NextLevelArrow } from './Header';

import closeButton from '../img/close.png'

export default function GameOverModal({ country, victory }) {

    const [countdown, setCountdown] = useState("");
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let interval = setInterval(() => {
            setCountdown(lastTimerCount => {
                let now = new Date();

                // tomorrow date
                let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

                let diff = tomorrow - now; // difference in ms

                var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((diff % (1000 * 60)) / 1000);

                return ('0' + hours).slice(-2) +
                    ":" + ('0' + minutes).slice(-2) +
                    ":" + ('0' + seconds).slice(-2);
            })
        }, 1000) //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval)
    }, []);

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.headerContainer}>
                        <GameOverMessage victory={victory} />
                        <TouchableOpacity
                            style={styles.closeImage}
                            onPress={() => setVisible(false)}
                        >
                            <Image
                                style={styles.closeImage}
                                source={closeButton}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.centerContainer}>
                        <View>
                            <Text style={styles.countDownText}>Next country in</Text>
                            <Text style={styles.countDownText}>{countdown}</Text>
                        </View>
                    </View>
                    <View style={styles.centerContainer}>
                        <NextLevelArrow />
                    </View>
                    <View style={styles.bottomContainer}>
                        <GlobeLink country={country} />
                        <View style={styles.bottomContainerSpacer}></View>
                        <ShareButton />
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        width: 300,
        height: 300,
        marginTop: '30%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#808080',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        opacity: 0.95
    },

    headerContainer: {
        width: '100%'
    },

    closeImage: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 5,
        top: 5
    },

    centerContainer: {
        flex: 8,
        justifyContent: 'center',
    },

    countDownText: {
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: "bold",
    },

    bottomContainer: {
        flex: 2,
        flexDirection: 'row',
        marginBottom: 25
    },

    bottomContainerSpacer: {
        height: '100%',
        width: 1,
        backgroundColor: 'black',
        marginHorizontal: 15
    },

});
