const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML =
            `<div class="info">
                <img src="${user.avatarUrl}" alt="Foto do perfil de usuário">
                <div class="data">
                    <h1>${user.name ?? "Não possui nome cadastrado 😭"}</h1>
                    <p>${user.bio ?? "Não possui bio cadastrada 😭"}</p>
                    <br>
                    <h4><i class="fas fa-users"></i> ${user.followers} Seguidores </h4>
                    <h4><i class="fas fa-user"></i> ${user.following} Seguindo</h4>

                </div>
            </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `
            <div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItens}</ul>
            </div>`
        }

        let eventsItens = ''
        user.events.forEach(event => {
            if(event.type === "PushEvent"){
                eventsItens += `
                <li class="event-item">
                    <h3><a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}</a></h3>
                    <p>- ${event.payload.commits[0].message}</p>
                </li>`
            }else if(event.type === "CreateEvent"){
                eventsItens += `
                <li class="event-item">
                    <h3><a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}</a></h3>
                </li>`
            }
        })

        if(eventsItens !== ''){
            this.userProfile.innerHTML += `
            <div class="events section">
                <h2>Eventos</h2>
                <ul class="event-list">${eventsItens}</ul>
            </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }