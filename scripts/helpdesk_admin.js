// Handle the JavaScript surrounding the admin center.
function sd_AdminIndex(oOptions)
{
	this.opt = oOptions;
	this.init();
}

sd_AdminIndex.prototype.init = function ()
{
	window.adminIndexInstanceRef = this;
	var fHandlePageLoaded = function () {
		window.adminIndexInstanceRef.loadAdminIndex();
	}
	addLoadEvent(fHandlePageLoaded);
}

sd_AdminIndex.prototype.loadAdminIndex = function ()
{
	// Load the text box containing the latest news items.
	if (this.opt.bLoadAnnouncements)
		this.setAnnouncements();

	// Load the current SMF and your SMF version numbers.
	if (this.opt.bLoadVersions)
		this.showCurrentVersion();

	// Load the text box that sais there's a new version available.
	if (this.opt.bLoadUpdateNotification)
		this.checkUpdateAvailable();
}


sd_AdminIndex.prototype.setAnnouncements = function ()
{
	if (!('sdAnnouncements' in window) || !('length' in window.sdAnnouncements))
		return;

	var sMessages = '';
	for (var i = 0; i < window.sdAnnouncements.length; i++)
		sMessages += this.opt.sAnnouncementMessageTemplate.replace('%href%', window.sdAnnouncements[i].href).replace('%subject%', window.sdAnnouncements[i].subject).replace('%time%', window.sdAnnouncements[i].time).replace('%message%', window.sdAnnouncements[i].message).replace('%author%', window.sdAnnouncements[i].author).replace('%readmore%', window.sdAnnouncements[i].href);

	setInnerHTML(document.getElementById(this.opt.sAnnouncementContainerId), this.opt.sAnnouncementTemplate.replace('%content%', sMessages));
}

sd_AdminIndex.prototype.showCurrentVersion = function ()
{
	if (!('sdVersion' in window))
		return;

	var oSdVersionContainer = document.getElementById(this.opt.sSdVersionContainerId);
	var oYourVersionContainer = document.getElementById(this.opt.sYourVersionContainerId);

	setInnerHTML(oSdVersionContainer, window.sdVersion);

	var sCurrentVersion = getInnerHTML(oYourVersionContainer);
	if (sCurrentVersion != window.sdVersion)
		setInnerHTML(oYourVersionContainer, this.opt.sVersionOutdatedTemplate.replace('%currentVersion%', sCurrentVersion));
}

sd_AdminIndex.prototype.checkUpdateAvailable = function ()
{
	if (!('sdUpdatePackage' in window))
		return;

	var oContainer = document.getElementById(this.opt.sUpdateNotificationContainerId);

	// Are we setting a custom title and message?
	var sTitle = 'sdUpdateTitle' in window ? window.sdUpdateTitle : this.opt.sUpdateNotificationDefaultTitle;
	var sMessage = 'sdUpdateNotice' in window ? window.sdUpdateNotice : this.opt.sUpdateNotificationDefaultMessage;

	setInnerHTML(oContainer, this.opt.sUpdateNotificationTemplate.replace('%title%', sTitle).replace('%message%', sMessage).replace('%criticaltitle%', sTitle));

	// Parse in the package download URL if it exists in the string.
	document.getElementById('update-link').href = this.opt.sUpdateNotificationLink.replace('%package%', window.sdUpdatePackage);

	if ('sdUpdateInformation' in window)
	{
		document.getElementById('information-link-span').style.display = 'block';
		document.getElementById('information-link').href = this.opt.sUpdateInformationLink.replace('%information%', window.sdUpdateInformation);
	}

	// If we decide to override life into "red" mode, do it.
	if ('sdUpdateCritical' in window && window.sdUpdateCritical == true)
	{
		document.getElementById('update_container').className = 'errorbox';
		document.getElementById('update_critical_title').style.display = 'block';
		document.getElementById('update_critical_alert').style.display = 'block';
		document.getElementById('update_title').style.display = 'none';
		document.getElementById('update_content').className = '';
	}

	document.getElementById('sd_update_section').style.display = 'block';
}

// Ticket number information...
function shd_ticket_total_information()
{
	var infocontainer = document.getElementById('shd_ticket_total_information');

	if (infocontainer.style.display == 'none')
		infocontainer.style.display = 'block';
	else
		infocontainer.style.display = 'none';
}