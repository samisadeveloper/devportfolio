import '@fontsource/vt323';

export default function Header() {
        return (
                <header style={{
                        display: 'flex',
                        gap: 20,
                        height: 60,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#0c1318',
                        fontFamily: 'VT323, monospace'
                }}>
                        <h1 style={{ fontSize: 45 }}>
                                SAM IS A DEVELOPER
                        </h1>
                </header>
        )
}
