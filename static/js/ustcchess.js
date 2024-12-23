const BASE_PROXY_URL = 'https://gh-proxy.xef2.top/https://github.com/USTC-XeF2/USTCchess/releases/download/';

function generateDownloadLinks(version) {
    return {
        windows: {
            icon: '<i class="fab fa-windows"></i>',
            url: `${BASE_PROXY_URL}v${version}/USTC-Chess-Setup-${version}.exe`,
            text: 'Windows'
        },
        linux: {
            icon: '<i class="fab fa-linux"></i>',
            url: `${BASE_PROXY_URL}v${version}/USTC-Chess-${version}-linux-x86_64.tar.gz`,
            text: 'Linux'
        },
        macos: {
            icon: '<i class="fab fa-apple"></i>',
            url: '#',
            text: 'macOS',
            disabled: true
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const versionCards = document.querySelectorAll('.version-card');

    versionCards.forEach(card => {
        const versionNumber = card.querySelector('.version-number').textContent.replace('v', '');
        const downloadButtons = card.querySelector('.download-buttons');

        const links = generateDownloadLinks(versionNumber);
        for (const platform in links) {
            const link = links[platform];
            const a = document.createElement('a');
            a.href = link.url;
            a.className = 'download-btn' + (link.disabled ? ' disabled' : '');
            a.innerHTML = `${link.icon} ${link.text}`;
            downloadButtons.appendChild(a);
        }
    });
});
